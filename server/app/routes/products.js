const express = require("express");
const router = express.Router();

const Events = require("../controllers/products")

router.get("/", Events.getAllProducts);
router.put("/", Events.addProduct);
router.get("/:id", Events.getSpecificProduct);
router.post("/:id", Events.updateProduct);
router.delete("/:id", Events.deleteProduct);


module.exports = router;