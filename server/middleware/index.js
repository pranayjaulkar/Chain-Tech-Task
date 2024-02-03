const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.js");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const JWT_SECRET = process.env.JWT_SECRET;
const customError = require("../utils/customError.js");
const { userSchema } = require("../models/schema");

module.exports.validateUser = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      console.log("JOI User Schema Validation Error:- \n", error);
      throw new customError(error, 400);
    }
    next();
  } catch (error) {
    next({ ...error, at: "/middleware/index.js" });
  }
};
module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const { userId } = req.cookies;
    if (userId) {
      const decodedData = jwt.verify(userId, JWT_SECRET);
      const user = await User.findById(decodedData._id);
      req.user = user;
    } else {
      throw new customError(error, 400);
    }
    next();
  } catch (error) {
    console.log("error: ", error);
    next({ ...error, at: "/middleware/index.js" });
  }
};
