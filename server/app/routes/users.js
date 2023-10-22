const express = require("express");
const router = express.Router();
const TokenController = require("../controllers/JwtController");
const UsersController = require("../controllers/UsersController");

router.get("/", TokenController.verifyToken, UsersController.getAllUsers);
router.get("/:credential", TokenController.verifyToken, UsersController.getUser);
router.post("/", UsersController.addUser);
router.put("/:id", TokenController.verifyToken, UsersController.updateUser);
router.delete("/:id", TokenController.verifyToken, UsersController.deleteUser);

module.exports = router;
