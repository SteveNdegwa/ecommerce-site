class ProductModel{ 
    constructor(values){
        this.columns = [
            "id",
            "name",
            // "supplier_id"
        ]
        this.values = values
    }
}

module.exports = ProductModel;