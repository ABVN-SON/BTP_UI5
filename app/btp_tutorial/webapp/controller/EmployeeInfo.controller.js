sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "../model/Models"
], function (BaseController, JSONModel, MessageToast, Fragment, Models) {
    "use strict";

    return BaseController.extend("myBTProject.controller.EmployeeInfo", {
        onInit() {

            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("EmployeeInfo").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            const ids = [
                "id.InputName",
                "id.InputSalary",
                "id.SelectDepartment",
                "id.DP2",
                "id.SelectLevel",
                "id.Email"
            ]
            const sPath = decodeURIComponent(oEvent.getParameter("arguments").EmployeePath);
            this.byId("id.btn.save").setVisible(sPath == "new" ? true : false)
            this.byId("id.btn.submit").setVisible(sPath !== "new" ? true : false)
            const Auth = this.getOwnerComponent().oAuth
            this.byId("id.InputSalary").setEditable(Auth ?. admin == "1" ? true : false)
            this.byId("id.btn.caculate").setVisible(Auth ?. admin == "1" ? true : false)
            // set editable
            ids.forEach((id) => {
                this._setEditable(id)
            })
            this._onsetinit(sPath);
        },

        onAddCer() {
            let oCers = this.getView().getModel("InputForm");
            let oData = oCers.getData();
            oData.Certificates.push({"Certificate": ""})
            oCers.setData(oData)
        },

        onNavEmployeeList() {
            this.getOwnerComponent().getRouter().navTo("EmployeeList", {}, true)

        },

        onNavtoInputForm() {
            this.getOwnerComponent().getRouter().navTo("EmployeeInfo")

        },

        onUploadImagePress() {
            if (!this._pDialog) {
                this._pDialog = Fragment.load({name: "myBTProject.view.fragment.UploadImageDialog", controller: this}).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }

            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onFileChange(oEvent) {
            var oFile = oEvent.getParameter("files")[0];
            if (oFile && oFile.type.match("image.*")) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var sImageData = e.target.result;

                    // Cập nhật ảnh và ẩn icon
                    var oImage = this.byId("uploadedImage");
                    var oIcon = this.byId("uploadIcon");

                    oImage.setSrc(sImageData);
                    oImage.setVisible(true);
                    oIcon.setVisible(false);

                    MessageToast.show("Image uploaded: " + oFile.name);
                }.bind(this);

                reader.readAsDataURL(oFile);
            } else {
                MessageToast.show("Only image files are allowed.");
            }

        },


        onPopupFileChange: function (oEvent) {
            this._oSelectedFile = oEvent.getParameter("files")[0];
        },

        onConfirmUpload: function () {
            if (!this._oSelectedFile) {
                MessageToast.show("Please select an image.");
                return;
            }

            var reader = new FileReader();
            reader.onload = function (e) {
                var sImageData = e.target.result;

                // Cập nhật ảnh
                this.byId("uploadedImage").setSrc(sImageData).setVisible(true);
                this.byId("uploadIcon").setVisible(false);

                this._pDialog.then(function (oDialog) {
                    oDialog.close();
                });

                MessageToast.show("Upload successful.");
            }.bind(this);

            reader.readAsDataURL(this._oSelectedFile);
        },

        onCloseUploadDialog: function () {
            this._pDialog.then(function (oDialog) {
                oDialog.close();
            });
        },

        onUploadDialogClose: function () {
            this._oSelectedFile = null; // Reset lại file
        },

        onEmailChange: function (oEvent) {
            var sEmail = oEvent.getParameter("value");
            var oInput = oEvent.getSource();

            // Regex kiểm tra định dạng email
            var bValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sEmail);

            if (! bValid) {
                oInput.setValueState("Error");
                oInput.setValueStateText("Email not permit");
            } else {
                oInput.setValueState("None");
            }
        },

       async onSubmit(oEvent) {
            let oEmployee = this.getView().getModel("InputForm").getData()
        let Employees = this.getOwnerComponent().oEmployees.value
        let oDepartments = this.getOwnerComponent().oDepartments.value
        let oRoles = this.getOwnerComponent().oRoles.value
            let updateEmployee = {
                firstName : oEmployee.Name ,
                ID: oEmployee.ID,
                hireDate: oEmployee.hireDate,
                salary: oEmployee.salary,
                email: oEmployee.email,
                department_ID :  oDepartments.find(Dep => Dep.name = oEmployee.Department).ID,
                role_ID : oRoles.find(Role => Role.name = oEmployee.RoleName).role_ID

            }
        const index = Employees.findIndex(emp=> emp.ID === updateEmployee.ID) ;
        this.getOwnerComponent().oEmployees[index] = updateEmployee
        const response = await Models.updateEmployee( updateEmployee )
           if ( response.code === 200 ){
            MessageToast.show("updated sucessfully")
           }else {
            MessageToast.show("updated fail")
           }
        },

        _onsetinit(i) {
            if (i !== "new") {
                let oEmployees = [this.getOwnerComponent().oEmployees.value[i]]
                let oDepartments = this.getOwnerComponent().oDepartments.value
                let oRoles = this.getOwnerComponent().oRoles.value

                // let EmployeeTable = oEmployess.map
                let Employees = oEmployees.map((Employee) => {
                    return {
                        ID: Employee.ID,
                        Department: `${
                            oDepartments.find(Dep => Dep.ID = Employee.department_ID).name
                        }`,
                        Name: Employee.firstName + Employee.lastName,
                        Email: Employee.email,
                        RoleName: `${
                            oRoles.find(Role => Role.ID = Employee.role_ID).name
                        }`,
                        salary: Employee.salary,
                        hireDate: Employee.hireDate,
                        email: Employee.email
                    }
                })
                const Employee = Employees[0];
                Employee.Roles = oRoles;
                Employee.Departments = oDepartments;
                this.byId("id.SelectLevel").setName(Employee.RoleName)
                this.byId("id.SelectDepartment").setName(Employee.Department)
                // set model\
                this.Employee = Employee
                const oEmployee = new JSONModel(Employee)
                this.getView().setModel(oEmployee, "InputForm");
            }
        },

        onSave(oEvent) {},
        async onCaculate(oEvent) {
            const Employee = this.getView().getModel("InputForm").oData;
            const newSalary = await Models.caculateSalary(Employee);
            console.log(newSalary);
            if (newSalary.code === 200) {
                this.getView().getModel("InputForm").setProperty("/salary", newSalary.value)
            }
        },
        _setEditable(id) {
            console.log(id);
            const Auth = this.getOwnerComponent().oAuth;
            this.byId(id).setEditable(Auth ?. admin == "1" ? true : false)
        }, 

        onChangeDepartment(oEvent) {
           const DepartmentName = oEvent.getParameters().selectedItem.mProperties.text
           this.getView().getModel("InputForm").setProperty("/Department" , DepartmentName)
        },

        onChangeRole(oEvent) {
            const RoleName =  oEvent.getParameters().selectedItem.mProperties.text ;  
            this.getView().getModel("InputForm").setProperty("/RoleName" , RoleName)
        }
    });
});
