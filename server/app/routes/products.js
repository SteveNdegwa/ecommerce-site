const express = require("express");
const router = express.Router();

const {getAllProducts, addProduct, getSpecificProduct, updateProduct, deleteProduct} = require("../models/database");

router.get("/", getAllProducts);
router.put("/", addProduct);
router.get("/:id", getSpecificProduct);
router.post("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;