const express = require("express");
const router = express.Router();
const TokenController = require("../controllers/JwtController");
const SuppliersController = require("../controllers/SuppliersController");

router.use(TokenController.verifyToken);

router.get("/", SuppliersController.getAllSuppliers);
router.get("/:credential", SuppliersController.getSupplier);
router.post("/", SuppliersController.addSupplier);
router.put("/:id", SuppliersController.updateSupplier);
router.delete("/:id", SuppliersController.deleteSupplier);

module.exports = router;
