const Database = require("../services/Database");

class ProductModel {
  constructor(category, manufacturer, description, supplierId, price, stock) {
    this.columns = {
      category: "category",
      manufacturer: "manufacturer",
      description: "description",
      supplierId: "supplier_id",
      price: "price",
      stock: "stock",
    };
    this.category = category;
    this.manufacturer = manufacturer;
    this.description = description;
    this.supplierId = supplierId;
    this.price = price;
    this.stock = stock;
  }

  static async getAllProducts() {
    const result = await Database.query("SELECT * FROM products");
    return result;
  }

  static async getProductById(id) {
    const result = await Database.query(
      `SELECT * FROM products WHERE product_id = '${id}'`
    );
    return result;
  }

  static async getProductByDescription(category, manufacturer, description) {
    const result = await Database.query(
      `SELECT * FROM products WHERE category = '${category}' AND manufacturer = '${manufacturer}' AND description = '${description}'`
    );
    return result;
  }

  static async getSearchProducts(searchValue) {
    const result = await Database.query(
      `SELECT * FROM products WHERE category LIKE '%${searchValue}%' OR manufacturer LIKE '%${searchValue}%' OR description LIKE '%${searchValue}%'`
    );
    return result;
  }

  async addProduct() {
    const result = await Database.query(
      `INSERT INTO products(${Object.values(this.columns)}) VALUES('${
        this.category
      }', '${this.manufacturer}','${this.description}', '${this.supplierId}', '${this.price}', '${
        this.stock
      }')`
    );
    return result;
  }

  async updateProduct(id) {
    let result = await Database.query(
      `UPDATE products SET ${this.columns.category} = '${this.category}', ${this.columns.manufacturer} = '${this.manufacturer}', ${this.columns.description} = '${this.description}', ${this.columns.supplierId} = '${this.supplierId}' , ${this.columns.price} = '${this.price}' , ${this.columns.stock} = '${this.stock}' WHERE product_id  = '${id}'`
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
