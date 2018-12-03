sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
], function (Controller, MessageBox, UIComponent, JSONModel) {
	"use strict";
	return Controller.extend("desafio-semana-01.desafio-semana-01.controller.View1", {
		onInit: function () {
			var data = {
				isValido: true
			};
			var oModel = new JSONModel(data);
			this.getView().setModel(oModel, "layout");
		},
		buscaCep: function (oEvent) {
			var newValue = this.byId("cep").mProperties.value;
			var Validacep = newValue.replace(/[^0-9]/g, '');
			// var oModelLayout = this.getView().getModel("layout");
			// var oLayoutData = oModelLayout.getData();
			// this.modelLayout = oModelLayout;
			if (Validacep.length == 8) {
				var oData = `https://viacep.com.br/ws/${newValue}/json/`;
				var oModel = new JSONModel(oData);
				this.model = oModel;
				this.getView().setModel(oModel);
				this.model.attachEvent("requestCompleted", this.onRequestComplete);
			} else {
				// var oModel = new JSONModel();
				// oLayoutData.isValido = false;
				// oModelLayout.setData(oLayoutData);
				// this.getView().setModel(oModel);
				MessageBox.error("O Cep informado está incompleto!");
			}
		},
		onRequestComplete: function (oEvent) {
			// var oModelLayout = this.modelLayout;
			// var oLayoutData = oModelLayout.getData();
			if (!oEvent.getParameters().success || this.oData.erro) {
				// var oModel = new JSONModel();
				// this.getView().setModel(oModel); 
				// oLayoutData.isValido = false;
				// oModelLayout.setData(oLayoutData);
				MessageBox.error("O Cep informado não foi encontrado!");
			} else {
				// oLayoutData.isValido = true;
				// oModelLayout.setData(oLayoutData); 
			}
		}

	});
});