var express = require("express");
var router = express.Router();
var HeroController = require("../controllers/hero");
var UserController = require("../controllers/user");
const verifyToken = require("../middleware/auth");

router.get("/me", verifyToken, UserController.getUser);
router.get("/:id", verifyToken, UserController.getUser);
router.patch("/:id", verifyToken, UserController.updateUser);
router.get("/:id/my-heroes", verifyToken, HeroController.getMyHeroes);

module.exports = router;
