const SupplierModel = require("../models/SupplierModel");

class SuppliersController {
  static async getAllSuppliers(req, res, next) {
    try {
      const result = await SupplierModel.getAllSuppliers();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  }

  static async getSupplier(req, res, next) {
    try {
      const result = await SupplierModel.getSupplier(req.params.credential);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  }

  static async addSupplier(req, res, next) {
    try {
      if (req.user?.role === "admin") {
        const supplier = await SupplierModel.getSupplier(req.body.name);
        if (supplier.length)
          return res.status(200).json("The supplier already exists");

        const Supplier = new SupplierModel(req.body.name);
        const result = await Supplier.addSupplier();
        return res.status(201).json(result);
      }
      return res.status(403).json("Not authorised to perform this action");
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  }

  static async updateSupplier(req, res, next) {
    try {
      if (req.user?.role === "admin") {
        const Supplier = new SupplierModel(req.body.name);
        const result = await Supplier.updateSupplier(req.params.id);
        return res.status(200).json(result);
      }
      return res.status(403).json("Not authorised to perform this action");
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  }

  static async deleteSupplier(req, res, next) {
    try {
      if (req.user?.role === "admin") {
        const result = await SupplierModel.deleteSupplier(req.params.id);
        return res.status(200).json(result);
      }
      return res.status(403).json("Not authorised to perform this action");
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  }
}

module.exports = SuppliersController;
