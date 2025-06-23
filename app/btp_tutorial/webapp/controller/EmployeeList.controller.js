sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel",
     "sap/m/MessageToast"
], function (BaseController, JSONModel,MessageToast) {
    "use strict";

    return BaseController.extend("myBTProject.controller.EmployeeInfo", {
        onInit() {
            let oDepartmentType = new sap.ui.model.json.JSONModel({
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
                ]

            })
            let EmployeeTable = this.getOwnerComponent().oEmployeeList
            this.getView().setModel(oDepartmentType, "EmployeeList")
            this.getView().getModel("EmployeeList").setData(EmployeeTable)
        },
        onAddCer() {
            let oCers = this.getView().getModel("InputForm");
            let oData = oCers.getData();
            oData.Certificates.push({"Certificate": ""})
            oCers.setData(oData)
        },
        onNavEmployeeList() {
            this.getOwnerComponent().getRouter().navTo("EmployeeList")
        },
        onNavtoInputForm() {
            this.getOwnerComponent().getRouter().navTo("EmployeeInfo")

        },

        onChangeDepartment(oEvent) {

            oEvent.getParameters().selectedItem.sId
        }

       



    });
});
