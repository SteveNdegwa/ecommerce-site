const express = require("express");
const router = express.Router();
const SuppliersController = require("../controllers/suppliers");

router.get("/", SuppliersController.getAllSuppliers)
router.get("/:credential", SuppliersController.getSupplier)
router.post("/", SuppliersController.addSupplier)
router.put("/:id", SuppliersController.updateSupplier)
router.delete("/:id", SuppliersController.deleteSupplier)

module.exports = router;