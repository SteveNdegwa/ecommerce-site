const ProductModel = require("../models/ProductModel")

class ProductsController{
    static async getAllProducts(req,res,next){
        const results = await ProductModel.getAllProducts();
        return res.json(results);
    }
    static async getSpecificProduct(req,res,next){
        const result = await ProductModel.getProduct(req.params.credential); // either name or id
        return res.json(result);
    }
    static async getSearchProducts(req,res,next){
        const result = await ProductModel.getSearchProducts(req.params.searchValue)
        return res.json(result);
    }
    static async addProduct(req,res,next){
        const name = await ProductModel.getProduct(req.body.name);
        if(name.length) return res.json("Product already exists in the database");

        const Product = new ProductModel(req.body.name, req.body.description, req.body.supplierId, req.body.price, req.body.stock);
        const results = await Product.addProduct();
        return res.json(results);
    }
    static async updateProduct(req,res,next){
        const Product = new ProductModel(req.body.name, req.body.description, req.body.supplierId, req.body.price, req.body.stock);
        const results = await Product.updateProduct(req.params.id);
        return res.json(results);
    }
    static async deleteProduct(req,res,next){
        const result = await ProductModel.getProduct(req.params.id);
        return res.json(result);
    }
}

module.exports = ProductsController;