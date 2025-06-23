sap.ui.define([
  "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageToast", "sap/ui/core/Fragment"
], function (BaseController, JSONModel, MessageToast, Fragment) {
  "use strict";

  return BaseController.extend("myBTProject.controller.EmployeeInfo", {
    onInit() {
      this.oInputForm = this.getOwnerComponent().getModel("InputForm")
      let oJsonModel = new sap.ui.model.json.JSONModel({
        "Certificates": [
          {
            "Certificate": "Cer1"
          }, {
            "Certificate": "Cer2"
          }
        ]
      })
      // this.oInputForm.setProperty("Certificates",oJsonModel)
      this.getView().setModel(oJsonModel, "InputForm")

    },
    onAddCer() {
      let oCers = this.getView().getModel("InputForm");
      let oData = oCers.getData();
      oData.Certificates.push({ "Certificate": "" })
      oCers.setData(oData)
    },
    onNavEmployeeList() {
      this.getOwnerComponent().getRouter().navTo("EmployeeList")

    },
    onNavtoInputForm() {
      this.getOwnerComponent().getRouter().navTo("EmployeeInfo")

    },
    onUploadImagePress() {
      if (!this._pDialog) {
        this._pDialog = Fragment.load({ name: "myBTProject.view.fragment.UploadImageDialog", controller: this }).then(function (oDialog) {
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
    }

  });
});
