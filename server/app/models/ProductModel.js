const Database = require("../services/Database");

class ProductModel {
  constructor(name, description, supplierId, price, stock) {
    this.columns = {
      name: "name",
      description: "description",
      supplierId: "supplier_id",
      price: "price",
      stock: "stock",
    };
    this.name = name;
    this.description = description;
    this.supplierId = supplierId;
    this.price = price;
    this.stock = stock;
  }

  static async getAllProducts() {
    const result = await Database.query("SELECT * FROM products");
    return result;
  }

  static async getProduct(credential) {
    const result = await Database.query(
      `SELECT * FROM products WHERE product_id = '${credential}' OR name = '${credential}'`
    );
    return result;
  }

  static async getSearchProducts(searchValue) {
    const result = await Database.query(
      `SELECT * FROM products WHERE name LIKE '%${searchValue}%' OR description LIKE '%${searchValue}%'`
    );
    return result;
  }

  async addProduct() {
    const result = await Database.query(
      `INSERT INTO products(${Object.values(this.columns)}) VALUES('${
        this.name
      }', '${this.description}', '${this.supplierId}', '${this.price}', '${
        this.stock
      }')`
    );
    return result;
  }

  async updateProduct(id) {
    let result = await Database.query(
      `UPDATE products SET ${this.columns.name} = '${this.name}', ${this.columns.description} = '${this.description}', ${this.columns.supplierId} = '${this.supplierId}' , ${this.columns.price} = '${this.price}' , ${this.columns.stock} = '${this.stock}' WHERE product_id  = '${id}'`
    );
    return result;
  }

  static async deleteProduct(id) {
    let result = await Database.query(
      `DELETE FROM products WHERE product_id = '${id}'`
    );
    return result;
  }
}

module.exports = ProductModel;
