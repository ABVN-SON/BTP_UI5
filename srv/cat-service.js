const cds = require("@sap/cds");
const condition = require("./condition")

class CatalogService extends cds.ApplicationService {
    init() {


        const {Employees, Departments} = this.entities
        this.on([
            'NEW', 'CREATE', 'UPDATE'
        ], Employees, async (req) => {

            if (condition.compareDate(req.data) ) {
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
            await INSERT.into(Employees).entries(req.data)
            return req.data
        });

        this.after( 'READ' , Employees, (data) => {
            // Process the data after reading Employees
            console.log("Employees data read:", data); 

            return {
                'name' :'son' , 
                 'tuoi' : 18  
            }
        }
        );
        this.on( 'READ' , Employees , async (req) => {
          
            return{
                'name' :'son' , 
                 'tuoi' : 18  
            };
        }
        )


    }
}

module.exports = CatalogService
