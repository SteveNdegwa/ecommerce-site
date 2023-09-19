const express = require("express");
const router = express.Router();

const Products = require("../controllers/products")

router.get("/", Products.getAllProducts);
router.put("/", Products.addProduct);
router.get("/:id", Products.getSpecificProduct);
router.post("/:id", Products.updateProduct);
router.delete("/:id", Products.deleteProduct);


module.exports = router;