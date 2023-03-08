var express = require("express");
var router = express.Router();
var HeroController = require("../controllers/hero");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, HeroController.getHeroes);

router.get("/list/:myUserId", verifyToken, HeroController.getMyHeroes);

router.patch("/tags", verifyToken, HeroController.addOrDeleteTagsHeroes);

router.get("/:id", verifyToken, HeroController.getHero);

router.post("/", verifyToken, HeroController.createHero);

router.patch("/:id", verifyToken, HeroController.updateHero);

router.delete("/:id", verifyToken, HeroController.deleteHero);

module.exports = router;
