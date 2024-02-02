const jwt = require("jsonwebtoken");

module.exports.createTokens = (user, JWT_SECRET) => {
  //create authToken
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};
