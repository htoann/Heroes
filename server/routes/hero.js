var express = require("express");
var router = express.Router();
var HeroController = require("../controllers/hero");
const verifyToken = require("../middleware/auth");

router.get("/search", HeroController.searchHero);

router.get("/", HeroController.getAllHeroes);

router.get("/:userId/my-heroes", verifyToken, HeroController.getMyHeroes);

router.get("/:id", HeroController.getHero);

router.post("/", verifyToken, HeroController.createHero);

router.patch("/:id", HeroController.updateHero);

router.delete("/:id", HeroController.deleteHero);

router.delete("/", verifyToken, HeroController.deleteManyHero);

module.exports = router;
