const express = require("express");
const router = express.Router();
const TokenController = require("../controllers/JwtController");
const ProductsController = require("../controllers/ProductsController");


router.get("/", ProductsController.getAllProducts);
router.get("/:id", ProductsController.getProductById);
router.get("/supplier/:supplierId", ProductsController.getProductBySupplierId);
router.get("/search/:searchValue", ProductsController.getSearchProducts);
router.post("/", TokenController.verifyToken, ProductsController.addProduct);
router.put("/:id", TokenController.verifyToken, ProductsController.updateProduct);
router.delete("/:id", TokenController.verifyToken, ProductsController.deleteProduct);

module.exports = router;
