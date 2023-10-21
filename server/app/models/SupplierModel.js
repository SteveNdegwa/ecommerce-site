const Database = require("../services/database-service");


class SupplierModel{ 
    constructor(name){
        this.columns = {
            name: "name",
        }
        this.name = name;
    }

    
    static async getAllSuppliers(){
        let result = await Database.query("SELECT * FROM suppliers");
        return result;
    }
    
    static async getSupplier(credential){
        let result = await Database.query(`SELECT * FROM suppliers WHERE supplier_id = '${credential}' OR name = '${credential}'`);
        return result;
    }

    async addSupplier(){
        let result = await Database.query(`INSERT INTO suppliers(${Object.values(this.columns)}) VALUES('${this.name}')`);
        return result;
    }

    async updateSupplier(id){
        let result = await Database.query(`UPDATE suppliers SET ${this.columns.name} = '${this.name}' WHERE supplier_id  = '${id}'`);
        return result; 
    }

    static async deleteSupplier(id){
        let result = await Database.query(`DELETE FROM suppliers WHERE supplier_id = '${id}'`);
        return result; 
    }
}


module.exports = SupplierModel;