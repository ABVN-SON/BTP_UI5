sap.ui.define([
    "sap/ui/model/json/JSONModel", "sap/ui/Device"
], function (JSONModel, Device) {
    "use strict";
    return {

        getEmployeeList: async (oEmployeeID) => {
            const url = oEmployeeID !== undefined ?  `/cat/Employees/${oEmployeeID.ID}` : `/cat/Employees`
            let oResult = {};
            try {
                const response = await fetch(`${url}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // body: JSON.stringify(oRequest)
                });

                oResult = await response.json();
                if (oResult.value) {
                    oResult.code = 200;
                }
            } catch (error) {
                oResult.error = error;
                oResult.code = 400;
            }
            return oResult;
        },

        getDepartMents: async () => {
            let oResult = {};
            try {
                const response = await fetch(`/cat/Departments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // body: JSON.stringify(oRequest)
                });

                oResult = await response.json();
                if (oResult.value) {
                    oResult.code = 200;
                }
            } catch (error) {
                oResult.error = error;
                oResult.code = 400;
            }
            return oResult;
        },

        getRoles: async () => {
            let oResult = {};
            try {
                const response = await fetch(`/cat/Roles`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // body: JSON.stringify(oRequest)
                });

                oResult = await response.json();
                if (oResult.value) {
                    oResult.code = 200;
                }
            } catch (error) {
                oResult.error = error;
                oResult.code = 400;
            }
            return oResult;
        },

        updateEmployee: async (oEmployee) => {
            let oResult = {};
            try {
                const response = await fetch(`/cat/Employees/${oEmployee.ID}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(oEmployee)
                });

                oResult = await response.json();
                if (oResult.value) {
                    oResult.code = 200;
                }
            } catch (error) {
                oResult.error = error;
                oResult.code = 400;
            }
            return oResult;
        },

        CreateEmployee: async (oBody) => {
            if (oBody) {

                let oResult = {};
                try {
                    const response = await fetch(`/cat/Employees`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(oBody)
                    });

                    oResult = await response.json();
                    if (oResult.value) {
                        oResult.code = 200;
                    }
                } catch (error) {
                    oResult.error = error;
                    oResult.code = 400;
                }
                return oResult;
            }
        } , 
        getAuthorization : async () => {
                let oResult = {};
                try {
                    const response = await fetch(`/cat/getRole`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                           
                        },

                    });

                    oResult = await response.json();
                    if (oResult.value) {
                        oResult.code = 200;
                    }
                } catch (error) {
                    oResult.error = error;
                    oResult.code = 400;
                }
                return oResult;
        }, 
        caculateSalary : async(oEmployee)=> { 
            let oResult = {};
            try {
                const response = await fetch(`/cat/CaculateSalary(id=${oEmployee.ID})`, 
                    {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },

                });

                oResult = await response.json();
                if (oResult.value) {
                    oResult.code = 200;
                }
            } catch (error) {
                oResult.error = error;
                oResult.code = 400;
            }
            return oResult;
        }
          

    }
})
