const Database = require("../services/Database");

class SupplierModel {
  constructor(name) {
    this.columns = {
      supplierName: "supplier_name",
    };
    this.supplierName = name;
  }

  static async getAllSuppliers() {
    let result = await Database.query("SELECT * FROM suppliers");
    return result;
  }

  static async getSupplier(credential) {
    let result = await Database.query(
      `SELECT * FROM suppliers WHERE supplier_id = '${credential}' OR supplier_name = '${credential}'`
    );
    return result;
  }

  async addSupplier() {
    let result = await Database.query(
      `INSERT INTO suppliers(${Object.values(this.columns)}) VALUES('${
        this.supplierName
      }')`
    );
    return result;
  }

  async updateSupplier(id) {
    let result = await Database.query(
      `UPDATE suppliers SET ${this.columns.supplierName} = '${this.supplierName}' WHERE supplier_id  = '${id}'`
    );
    return result;
  }

  static async deleteSupplier(id) {
    let result = await Database.query(
      `DELETE FROM suppliers WHERE supplier_id = '${id}'`
    );
    return result;
  }
}

module.exports = SupplierModel;
