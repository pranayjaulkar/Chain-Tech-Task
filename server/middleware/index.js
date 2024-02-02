const dotenv = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
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
