const express = require("express");
const router = express.Router();
const { authorize } = require("../controllers/jwt");
const ProductsController = require("../controllers/products")

router.use(authorize);

router.get("/", ProductsController.getAllProducts);
router.get("/:credential", ProductsController.getSpecificProduct);
router.get("/search/:searchValue", ProductsController.getSearchProducts);
router.post("/", ProductsController.addProduct);
router.put("/:id", ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);


module.exports = router;