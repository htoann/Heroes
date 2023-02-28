const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HeroSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    address: String,
    age: Number,
    mail: String,
    gender: Boolean,
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", HeroSchema);
