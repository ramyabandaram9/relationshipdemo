using { relationshipdemo.db as rel } from '../db/relshipdemo';



service relsrv {
    
    //associations
    entity HeaderSet as projection on rel.Header;
    entity ItemSet as projection on rel.Items;

    //compositions
    entity SalesOrderHeaderSet as projection on rel.SalesOrderHeader actions{
        action approveOrder();
    };
    entity SalesOrderItemsSet as projection on rel.SalesOrderItems;

    function getOrderTotal(orderId : UUID) returns Decimal(15,10);

}

annotate relsrv.SalesOrderHeaderSet with @(
      UI:{
        SelectionFields :[
            ID,description
        ],
        LineItem  : [
            {$Type:'UI.DataField', Value : ID},
            {$Type:'UI.DataField', Value :description}
        ],
    }
);

annotate relsrv.SalesOrderItemsSet with @(
    UI:{
        SelectionFields  : [
            headerID,product,quantity
        ],
        LineItem  : [
            {$Type:'UI.DataField',Value : ID},
            {$Type:'UI.DataField',Value:product},
             {$Type:'UI.DataField',Value:quantity}
        ],
    }
);

