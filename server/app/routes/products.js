const express = require("express");
const router = express.Router();
const TokenController = require("../controllers/JwtController");
const ProductsController = require("../controllers/ProductsController");

router.use(TokenController.verifyToken);

router.get("/", ProductsController.getAllProducts);
router.get("/:credential", ProductsController.getSpecificProduct);
router.get("/search/:searchValue", ProductsController.getSearchProducts);
router.post("/", ProductsController.addProduct);
router.put("/:id", ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);

module.exports = router;
