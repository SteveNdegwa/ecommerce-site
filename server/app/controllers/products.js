const Database = require("../models/database")

class Products{
    static getAllProducts  = (req,res)=>{
        const results = Database.actions().get().all()
        return res.json(results);
    }
    static getSpecificProduct  = (req,res)=>{
        const result = Database.actions().get().specific(req.params.id)
        return res.json(result);
    }
    static addProduct = (req,res)=>{
        const results = Database.actions().add()
        return res.json(results);
    }
    static updateProduct  = (req,res)=>{
        const results = Database.actions().update(req.params.id)
        return res.json(results);
    }
    static deleteProduct  = (req,res)=>{
        const results = Database.actions().delete(req.params.id)
        return res.json(results);
    }
}

module.exports = Products;