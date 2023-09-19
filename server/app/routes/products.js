const express = require("express");
const router = express.Router();

const ProductsDatabase = require("../models/database");

router.get("/", ProductsDatabase.getAllProducts);
router.put("/", ProductsDatabase.addProduct);
router.get("/:id", ProductsDatabase.getSpecificProduct);
router.post("/:id", ProductsDatabase.updateProduct);
router.delete("/:id", ProductsDatabase.deleteProduct);


module.exports = router;