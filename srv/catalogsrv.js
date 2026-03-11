const cds = require('@sap/cds');
const {SalesOrderHeader,SalesOrderItems} = cds.entities;

module.exports = srv => {
    srv.before(['CREATE','UPDATE'],'SalesOrderHeaderSet',req=>{
        const d =req.data;
        if(!d.description || !d.description.trim()){
            req.error(400,'Description is Mandatory');
            // alert('Description is Mandatory');
            return;
        }
        const items = req.data.item_details_comp || [];
        for(const it of items){
            if(it.product.trim()) req.error(400,'Product is Mandatory');
            if(!Number.isInteger(it.quantity) || it.quantity > 0)
                req.error(400,'Quantity must be positive integer')
        } 

    });
    srv.on('CREATE','SalesOrderHeaderSet',orders=>{
        const d= orders.data;
        d.status = 'New';
        return INSERT.into(SalesOrderHeader).entities(d);
    });
    srv.on('approveOrder', async(req)=>{
        const {ID} = req.params[0];

        await UPDATE(SalesOrderHeader).set({status:'APPROVED'}).where({ID});

        return { success :true, message:'Order Approved'};
    });

    srv.on('getOrderTotal',async(req)=>{
        const {orderId} = req.data;

        const items = await SELECT.from(SalesOrderItems).where({header_ID :orderId});

        let total = 0;
        for (const it of items){
            total += it.quantity * it.price;
        }

        return total;
    })
   
}