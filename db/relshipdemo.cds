namespace relationshipdemo.db;

using { managed } from '@sap/cds/common';


entity Header : managed {
    key ID           : UUID;
        description  : String;
        item_details : Association to many Items
                           on item_details.headerID = $self.ID;
}

entity Items : managed {
    key ID       : UUID;
        headerID : UUID;
        product  : String;
        quantity : Integer;
}

type statusTxt : String enum{
    New = 'New';
    Inprocess = 'Inprocess';
    Completed = 'Completed';
}
entity SalesOrderHeader{
    key ID   :UUID;
    description : String;
    item_details_comp : Composition of many SalesOrderItems on item_details_comp.header = $self;
    status : statusTxt;
}

entity SalesOrderItems {
    key ID   : UUID;
    header : Association to SalesOrderHeader;
    product : String;
    quantity :Integer;
    price : Decimal(15,10);
}