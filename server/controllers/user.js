const Hero = require("../models/hero");

exports.getMyHeroes = async (req, res, next) => {
  try {
    const heroes = await Hero.find({ userId: req.user.id });
    res.status(200).json(heroes);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};