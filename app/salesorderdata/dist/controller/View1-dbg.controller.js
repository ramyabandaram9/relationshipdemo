sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("salesorderdata.controller.View1", {
        onInit() {
        },
        async onApproveOrder(){
            const oTable = this.byId('salesDesTabId');
            const oItem = oTable.getSelectedItem();
            if(!oItem){
                new sap.m.MessageToast.show('Select an Order....');
                return;
            }

            const oCtx =oItem.getBindingContext();
            const oAction =  this.getView().getModel().bindContext('relsrv.approveOrder(...)',oCtx);

            try {
                await oAction.execute();
                sap.m.MessageToast.show('Order Approved');
                await this.getView().getModel().refresh();
            }catch(error){
                 sap.m.MessageToast.show('Failed');
            }
        },
        async onItemPress(oEvent){
            var ordid = oEvent.getParameter('listItem').getBindingContext().getObject().ID;

            var oModel = this.getOwnerComponent().getModel();
            var oList = oModel.bindContext(`/SalesOrderHeaderSet(ID=${ordid})`,null,{
                $expand : 'item_details_comp'
            });
            var oCtx = await oList.requestObject();
            this.getView().setModel(new sap.ui.model.json.JSONModel(oCtx.item_details_comp),"soitems")
        },

        async onOrderTotal(){
            const oTable =this.byId('salesDesTabId');
            const oItem = oTable.getSelectedItem();
            if(!oItem){
                sap.m.MessageToast.show('Select an Order first');
                return;
            }

            const oCtx = oItem.getBindingContext();
            const sOrderId = oCtx.getProperty('ID');

            const oModel = this.getView().getModel();
            const oFunction = oModel.bindContext(
                `/getOrderTotal(orderId='${sOrderId}')`
            );
            try{
                const oResultsCtx = await oFunction.requestObject();
                const oTotal = oResultsCtx.value;

                this.byId('totalTXTId').setText(`Total: $${oTotal}`)

            }catch(error){
                sap.m.MessageToast.show(error.message || "Failed to get total")
            }
        }
    });
});