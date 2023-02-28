var express = require("express");
var router = express.Router();
var HeroController = require("../controllers/hero");

router.get("/my-heroes", HeroController.getMyHeroes);

module.exports = router;
