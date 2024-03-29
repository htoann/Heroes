const Hero = require("../models/hero");

exports.getHeroes = async (req, res, next) => {
  const name = req.query.name;
  const tags = req.query.tags?.length > 0 ? req.query.tags.split(",") : null;

  try {
    let heroes;
    // query ?name=hero
    if (name) {
      heroes = await Hero.find({
        userId: req.user.user_id,
        name: { $regex: new RegExp(req.query.name, "i") },
      }).exec();
      // query ?tag=test, test1
    } else if (tags) {
      heroes = await Hero.find({
        userId: req.user.user_id,
        tags: { $all: tags },
      });
    } else {
      heroes = await Hero.find({ userId: req.user.user_id });
    }

    res.status(200).json(heroes);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};

exports.getMyHeroes = async (req, res, next) => {
  try {
    const heroes = await Hero.find({
      userId: req.user.user_id,
    });

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
    const existingHero = await Hero.findOne({ name: req.body.name });
    if (existingHero) {
      return res.status(400).send("A hero with that name already exists");
    }

    const hero = await Hero.create({ userId: req.user.user_id, ...req.body });
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
    const hero = await Hero.findByIdAndUpdate(
      { userId: req.user.user_id, _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

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

exports.addOrDeleteTagsHeroes = async (req, res, next) => {
  const { heroIds, tags } = req.body;
  const action = req.query.action;
  let heroes;

  try {
    if (action === "add") {
      heroes = await Hero.updateMany(
        { _id: { $in: heroIds } },
        {
          $addToSet: {
            tags: { $each: tags },
          },
        },
        { new: true }
      );
    } else if (action === "delete") {
      heroes = await Hero.updateMany(
        { userId: req.user.user_id, _id: { $in: heroIds } },
        { $pull: { tags: { $in: tags } } }
      );
    }

    if (!heroes) {
      return res.status(404).send("No hero found");
    }

    res.status(200).json(heroes);
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

    res.status(200).json(hero);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};

exports.deleteManyHero = async (req, res, next) => {
  const heroIds = req.body.ids;
  try {
    const heroes = await Hero.deleteMany({
      userId: req.user.user_id,
      _id: { $in: heroIds },
    });
    if (!heroes) {
      return res.status(404).send("No hero found");
    }
    res.status(200).json(heroes);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};

exports.getAllTags = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const heroes = await Hero.find({ userId: userId });

    // Extract the tags from each hero
    const tags = heroes.flatMap((hero) => hero.tags);

    // Filter out any duplicate tags
    const uniqueTags = Array.from(new Set(tags));

    res.status(200).json(uniqueTags);
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    });
  }
};
