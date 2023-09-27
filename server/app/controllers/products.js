const Database = require("../services/database-service")
const productModel = require("../models/product-model")

class ProductsController{
    static getAllProducts  = async(req,res)=>{
        const results = await Database.Products().find().all()
        return res.json(results);
    }
    static getSpecificProduct  = async(req,res)=>{
        const result = await Database.Products().find().where("id", req.params.id)
        return res.json(result);
    }
    static addProduct = async(req,res)=>{
        const product = new productModel(); /// values
        const results = await Database.Products().add(product.columns, product.values)
        return res.json(results);
    }
    static updateProduct  = async(req,res)=>{
        const results = await Database.Products().update("name", "newName", "id", req.params.id)
        return res.json(results);
    }
    static deleteProduct  = async(req,res)=>{
        const results = await Database.Products().remove("id", req.params.id)
        return res.json(results);
    }
}

module.exports = ProductsController;