var express = require("express");
var router = express.Router();
var HeroController = require("../controllers/hero");

router.get("/", HeroController.getAllHeroes);

router.get("/:id", HeroController.getHero);

router.post("/", HeroController.createHero);

router.patch("/:id", HeroController.updateHero);

router.delete("/:id", HeroController.deleteHero);

module.exports = router;
