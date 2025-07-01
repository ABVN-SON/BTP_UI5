sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel",
     "sap/m/MessageToast" 
], function (BaseController, JSONModel,MessageToast) {
    "use strict";

    return BaseController.extend("myBTProject.controller.EmployeeInfo", {
        onInit() {
  
            let oEmployees = this.getOwnerComponent().oEmployees.value
            let oDepartments = this.getOwnerComponent().oDepartments.value
            let oRoles = this.getOwnerComponent().oRoles.value

            // let EmployeeTable = oEmployess.map
            let EmployeeTable = oEmployees.map(
            (Employee) =>{
                return {  "ID" : Employee.ID, 
                        "Department" : `${oDepartments.find( Dep=> Dep.ID = Employee.department_ID  ).name}` ,
                         "Name" :  Employee.firstName + Employee.lastName,
                         "Email" : Employee.email,
                         "RoleName" : `${oRoles.find(Role=> Role.ID = Employee.role_ID ).name}`
                  }
            } )  

            let oEmployeeTable =  new sap.ui.model.json.JSONModel( {
                "EmployeeTable" : EmployeeTable
            } )

            this.getView().setModel(oEmployeeTable, "EmployeeList")
            // this.getView().getModel("EmployeeList").setData(oEmployeeTable) 
            this.getOwnerComponent().getRouter().getRoute("EmployeeList").attachMatched(this._onMatched,this)
        },

        _onMatched(oEvent) {
            let oEmployees = this.getOwnerComponent().oEmployees.value
            let oDepartments = this.getOwnerComponent().oDepartments.value
            let oRoles = this.getOwnerComponent().oRoles.value

            // let EmployeeTable = oEmployess.map
            let EmployeeTable = oEmployees.map(
            (Employee) =>{
                return { "ID" : Employee.ID,
                         "Department" : `${oDepartments.find( Dep=> Dep.ID = Employee.department_ID  ).name}` ,
                         "Name" :  Employee.firstName + ' ' + Employee.lastName,
                         "Email" : Employee.email,
                         "RoleName" : `${oRoles.find(Role=> Role.ID = Employee.role_ID ).name}`
                  }
            } )  

            let oEmployeeTable =  new sap.ui.model.json.JSONModel( {
                "EmployeeTable" : EmployeeTable
            } )
        }, 

        onAddCer() {
            let oCers = this.getView().getModel("InputForm");
            let oData = oCers.getData();
            oData.Certificates.push({"Certificate": ""})
            oCers.setData(oData)
        },
        onNavtoInputForm(oEvent) {
          //get auth 
         const Auth  = this.getOwnerComponent()?.oAuth
         console.log(Auth);
         if ( Auth?.admin == '1' ) { 
            this.getOwnerComponent().getRouter().navTo("CreateEmployee" , {})
         }else{ 
            MessageToast.show("You don't have authorization");
         }
        },

        onChangeDepartment(oEvent) {

            oEvent.getParameters().selectedItem.sId
            
        },
        
        onPressDetail(oEvent) {
            console.log(oEvent);
            const id = oEvent.getSource().getId().charAt( oEvent.getSource().getId().length - 1 ) ;
            const oEmployee = this.getOwnerComponent().oEmployees.value ; 
            this.getOwnerComponent().getRouter().navTo(  "EmployeeInfo" ,{ EmployeePath : oEmployee[ id ].ID } )
        }
       



    });
});
