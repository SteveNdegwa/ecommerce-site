const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

router.get("/", UsersController.getAllUsers)
router.get("/:credential", UsersController.getUser)
router.post("/", UsersController.addUser)
router.put("/:id", UsersController.updateUser)
router.delete("/:id", UsersController.deleteUser)

module.exports = router;