var express = require("express");
var router = express.Router();
var HeroController = require("../controllers/hero");
const verifyToken = require("../middleware/auth");

router.get("/search", verifyToken, HeroController.searchHero);

router.get("/", verifyToken, HeroController.getAllHeroes);

router.get("/:userId/my-heroes", verifyToken, HeroController.getMyHeroes);

router.get("/:id", verifyToken, HeroController.getHero);

router.post("/", verifyToken, HeroController.createHero);

router.patch("/tags", verifyToken, HeroController.updateManyHero);

router.patch("/:id", verifyToken, HeroController.updateHero);

router.delete("/:id", verifyToken, HeroController.deleteHero);

router.delete("/", verifyToken, HeroController.deleteManyHero);

module.exports = router;
