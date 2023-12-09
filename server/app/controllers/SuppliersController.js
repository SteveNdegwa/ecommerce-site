const SupplierModel = require("../models/SupplierModel");

class SuppliersController{
    static async getAllSuppliers(req, res, next){
       try {
         const result  = await SupplierModel.getAllSuppliers();
         return res.status(200).json(result);
       } catch (error) {
        return res.status(500).json("Internal server error")
       }
    }

    static async getSupplier(req, res, next){
        const result  = await SupplierModel.getSupplier(req.params.credential);
        return res.json(result);
    }

    static async addSupplier(req, res, next){
        const supplier = await SupplierModel.getSupplier(req.body.name);
        if(supplier.length) return res.json("The supplier already exists")

        const Supplier = new SupplierModel(req.body.name);
        const result = await Supplier.addSupplier();
        return res.json(result);
    } 

    static async updateSupplier(req, res, next){
        const Supplier = new SupplierModel(req.body.name);
        const result = await Supplier.updateSupplier(req.params.id);
        return res.json(result);
    }
    
    static async deleteSupplier(req, res, next){
        const result  = await SupplierModel.deleteSupplier(req.params.id);
        return res.json(result);
    }
}

module.exports = SuppliersController;
