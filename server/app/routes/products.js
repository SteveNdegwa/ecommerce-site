const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/products")

router.get("/", ProductsController.getAllProducts);
router.put("/", ProductsController.addProduct);
router.get("/:id", ProductsController.getSpecificProduct);
router.post("/:id", ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);


module.exports = router;