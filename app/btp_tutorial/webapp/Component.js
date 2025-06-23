/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent" , "sap/ui/model/json/JSONModel"
],
function (UIComponent) {
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
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
            // enable routing 
            this.oEmployeeList = {
                "Key": "1",
                "DepartmentTypes": [
                    {
                        "keyID": "RDC",
                        "Text": "RDC"
                    }, {
                        "keyID": "IES",
                        "Text": "IES"
                    }
                ], 
                "RangeTypes" : [
                    {"keyID" : "JR", "Text": "Junior" },
                    {"keyID" : "SP", "Text": "Special List" },
                    {"keyID" : "SSP", "Text": "Senior Special List" }
                ] , 
                "EmployeeTable" : [
                    {
                        "Department": "RDC",
                        "Name": "Alice",
                        "Email": "alice@example.com",
                        "Level": "Senior",
                        "Gender": "Female",
                        "DateOfBirth": "1990-01-01",
                        "WorkingFrom": "2020-03-01"
                      },
                      {
                        "Department": "IES",
                        "Name": "Bob",
                        "Email": "bob@example.com",
                        "Level": "Junior",
                        "Gender": "Male",
                        "DateOfBirth": "1995-05-12",
                        "WorkingFrom": "2021-07-10"
                      }
                ]

            }
            this.getRouter().initialize();

        }
    });
},


);