var express = require("express");
var router = express.Router();
var UserController = require("../controllers/user");
const verifyToken = require("../middleware/auth");

router.get("/me", verifyToken, UserController.getUser);
router.get("/:id", verifyToken, UserController.getUser);
router.patch("/:id", verifyToken, UserController.updateUser);

module.exports = router;
