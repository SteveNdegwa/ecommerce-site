const ProductsDatabase = require("../models/database")

class Events{
    static getAllProducts  = (req,res)=>{
        const results = ProductsDatabase.actions().get().all()
        return res.json(results);
    }
    static getSpecificProduct  = (req,res)=>{
        const result = ProductsDatabase.actions().get().specific(req.params.id)
        return res.json(result);
    }
    static addProduct = (req,res)=>{
        const results = ProductsDatabase.actions().add()
        return res.json(results);
    }
    static updateProduct  = (req,res)=>{
        const results = ProductsDatabase.actions().update(req.params.id)
        return res.json(results);
    }
    static deleteProduct  = (req,res)=>{
        const results = ProductsDatabase.actions().delete(req.params.id)
        return res.json(results);
    }
}

module.exports = Events;