var express = require("express");
var router = express.Router();
var Authentication = require("../auth/authentication");

router.post("/register", Authentication.register);

router.post("/login", Authentication.login);

module.exports = router;
