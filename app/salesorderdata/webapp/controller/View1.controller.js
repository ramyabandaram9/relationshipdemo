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
        }
    });
});