const jwt = require("jsonwebtoken");

const createToken = (user, JWT_SECRET) => {
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
module.exports = createToken;
