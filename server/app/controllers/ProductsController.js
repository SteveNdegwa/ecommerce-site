const ProductModel = require("../models/ProductModel");

class ProductsController {
  static async getAllProducts(req, res, next) {
    try {
      const results = await ProductModel.getAllProducts();
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  }

  static async getProductById(req, res, next) {
    try {
      const result = await ProductModel.getProductById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  }

  static async getProductBySupplierId(req, res, next) {
    try {
      const result = await ProductModel.getProductBySupplierId(req.params.supplierId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  }

  static async getSearchProducts(req, res, next) {
    try {
      const result = await ProductModel.getSearchProducts(
        req.params.searchValue
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  }
  static async addProduct(req, res, next) {
    try {
      if (req.user?.role === "admin") {
        const product = await ProductModel.getProductByDescription(
          req.body.category,
          req.body.manufacturer,
          req.body.description
        );
        if (product.length)
          return res.status(200).json("Product already exists in the database");

        const {
          category,
          manufacturer,
          description,
          supplierId,
          price,
          stock,
        } = req.body;

        const Product = new ProductModel(
          category,
          manufacturer,
          description,
          supplierId,
          price,
          stock
        );
        const results = await Product.addProduct();
        return res.status(201).json(results);
      }
      return res.status(403).json("Not authorised to perform this action");
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  }
  static async updateProduct(req, res, next) {
    try {
      if (req.user?.role === "admin") {
        const {
          category,
          manufacturer,
          description,
          supplierId,
          price,
          stock,
        } = req.body;

        const Product = new ProductModel(
          category,
          manufacturer,
          description,
          supplierId,
          price,
          stock
        );
        const results = await Product.updateProduct(req.params.id);
        return res.status(200).json(results);
      }
      return res.status(403).json("Not authorised to perform this action");
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      if (req.user?.role === "admin") {
        const result = await ProductModel.deleteProduct(req.params.id);
        return res.status(200).json(result);
      } else {
        return res.status(403).json("Not authorised to perform this action");
      }
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  }
}

module.exports = ProductsController;
