const Hero = require("../models/hero");

exports.getAllHeroes = async (req, res, next) => {
  try {
    const heroes = await Hero.find();
    res.status(200).json(heroes);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};

exports.getHero = async (req, res, next) => {
  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).send("No hero found");
    }

    res.status(200).json(hero);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};

exports.createHero = async (req, res, next) => {
  try {
    // const hero = await Hero.create({ userId: req.user._id, ...req.body });
    const hero = await Hero.create({ ...req.body });

    if (!hero) {
      return res.status(404).send("Something went wrong");
    }

    res.status(200).json(hero);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};

exports.updateHero = async (req, res, next) => {
  try {
    const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hero) {
      return res.status(404).send("No hero found");
    }

    res.status(200).json(hero);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};

exports.deleteHero = async (req, res, next) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);

    if (!hero) {
      return res.status(404).send("No hero found");
    }

    res.status(200).json("Delete hero successfully");
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};
