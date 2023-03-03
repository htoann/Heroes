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
    const { name, email } = req.body;
    const user = await User.findOne({ _id: req.user.user_id });

    if (user.name !== name) {
      const nameExists = await User.findOne({ name });
      if (nameExists) {
        return res.status(400).json("Name already exists in the system");
      }
      user.name = name;
    }

    if (user.email !== email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json("Email already exists in the system");
      }
      user.email = email;
    }

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};
