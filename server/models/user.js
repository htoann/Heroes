const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
