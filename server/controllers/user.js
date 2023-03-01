const User = require("../models/user");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.user_id);

    res.status(200).json(user);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("No user found");
    }

    res.status(200).json(user);
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
      return res.status(404).send("No user found");
    }

    res.status(200).json(hero);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};
