const cds = require("@sap/cds");
const condition = require("./condition")

class CatalogService extends cds.ApplicationService {
    async init() {
        const {Employees, Departments, Roles , SF_Candidates , SF_Employment , SF_EmpTer } = this.entities ;
        const sf_emp = await cds.connect.to("sf_emp") ; 
        const sf_emp_ter = await cds.connect.to("sf_emp_ter");
        const sf_can = await cds.connect.to("sf_can");

        this.on([
            'NEW', 'CREATE', 'UPDATE'
        ], Employees, async (req) => {
            
            if (condition.compareDate(req.data)) {
                return req.error(405, "Not allow Date of birth >= Hire date");
            }
            if (! condition.hasnonumber(req.data.firstName) || ! condition.hasnonumber(req.data.lastName)) {
                // Respond with an error status code 405 (Method Not Allowed)
                // and a message indicating that the date of birth cannot be greater than or equal to the hire date.
                return req.error(406, "first name/last name not allow");
            }
            if (! condition.isValidEmail(req.data.email)) {
                return req.error(407, "Email is not valid");
            }
            condition.updateSalaryIfOver3Years(req.data)
            console.log(req.data.ID)
           if (req.method === "PATCH"){
               await UPDATE (Employees,req.data.ID).with(req.data)
           }else{
              await INSERT.into(Employees).entries(req.data)
           }
            
            return req
        });

        // this.after('READ', Employees, (data) => { // Process the data after reading Employees
        //     console.log("Employees data read:", data);

        //     return {'name': 'son', 'tuoi': 18}
        // });

        this.on('READ', Employees, async (req) => {
            console.log(req.user.roles)
            // console.log(req.query.SELECT.where)
            let a = await SELECT.from(Employees).where(req.query.SELECT.where)
            return a 
        })

        this.on('READ', SF_Candidates ,async (req) => {
           const a = SELECT.from(req.query.SELECT.from).limit(10) ; 
           const result = await sf_can.tx(  req  ).send( { query : a } )
           return result
    
        })

        this.on('READ', SF_Employment, async (req) => {
            const a = SELECT.from(req.query.SELECT.from).limit(10) ; 
            const result = await sf_emp.tx(  req  ).send( { query : a } )
            return result
    
        })

        this.on('READ', SF_EmpTer,async (req) => {
            const a = SELECT.from(req.query.SELECT.from).limit(10) ; 
            const result = await sf_emp.tx(  req  ).send( { query : a } )
            return result
    
        })

        this.on('CREATE', SF_Candidates,async (req) => {
            // const a = INSERT.into( SF_Candidates ).entries(req.data)
            // const result = await sf_can.run( a ) ; 
            const b = SELECT.from( SF_Candidates ).where({primaryEmail:"songuyen@email.com"}); 
            const result1 = await sf_emp.tx(  req  ).send( { query : b } )
            return result1
        }) 


        this.on('CaculateSalary' , async ({data:{id}})=>{
            console.log(id);
            //select employee info  
            const employee = await SELECT.from( Employees ).where({ ID : `${id}` }).columns( 'firstName', 'role.baseSalary' ,'role.name' ,'hireDate' )
            
            console.log(employee);
            let salary = condition.caculateSalary( employee[0]  )
            return salary
        })
        
        this.on('READ', Departments , async(req)=>{
            const result = await SELECT.from( Departments )
            return result
        })

        this.on('READ', Departments , async(req)=>{
            const result = await SELECT.from( Departments )
            return result
        })

        this.on('READ', Roles , async(req)=>{
            const result = await SELECT.from( Roles )
            return result
        }), 
        
        this.on("getRole", async(req)=>{ 
            console.log(req.user)
           return req.user.roles
        })

    }
}

module.exports = CatalogService
