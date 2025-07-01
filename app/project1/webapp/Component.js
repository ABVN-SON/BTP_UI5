/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent" , "sap/ui/model/json/JSONModel","myBTProject/model/Models"

],
function (UIComponent,JSONModel,Models) {
    "use strict";

    return UIComponent.extend("myBTProject.Component", {
        metadata : {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: async function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
 
            let Employees = await Models.getEmployeeList() ; 
            this.oEmployees = Employees ; 

            let Departments = await Models.getDepartMents() ; 
            this.oDepartments = Departments ; 

            let Roles = await Models.getRoles() ;
            this.oRoles = Roles ; 
            let Auth = await Models.getAuthorization() ;
            this.oAuth = Auth ;

            this.getRouter().initialize();

        }
    });
},


);