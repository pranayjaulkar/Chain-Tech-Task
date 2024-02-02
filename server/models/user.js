const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
