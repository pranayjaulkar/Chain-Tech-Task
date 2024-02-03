const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const customError = require("./utils/customError.js");
const createCookie = require("./utils/createCookie.js");
const createToken = require("./utils/createToken.js");
const { validateUser, isLoggedIn } = require("./middleware/index");
const catchAsyncError = require("./utils/catchAsyncError.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");
const User = require("./models/user.js");
const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const app = express();
const DB_CONNECTION_URL =
  process.env.DB_CONNECTION_URL || "mongodb://127.0.0.1:27017/memories";
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";
const saltRounds = process.env.SALT_ROUNDS || 10;
const SERVER_HOST_ADDRESS = process.env.SERVER_HOST_ADDRESS;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist/")));
  app.use(
    cors({
      origin: SERVER_HOST_ADDRESS,
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5000"],
      credentials: true,
    })
  );
}
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(DB_CONNECTION_URL)
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.log("MongoDB Connection Error\n", error);
  });

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.post(
  "/users/login",
  catchAsyncError(async (req, res) => {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });

    //if user exists then return user object else return "user did not register" or "no account found"
    if (user) {
      const match = await bcrypt.compare(userData.password, user.password);
      if (!match) {
        return res.status(403).json({ error: "INVALID_EMAIL_OR_PASSWORD" });
      }
      //create jwt
      const authToken = createToken(user, JWT_SECRET);
      //create cookie to embed jwt
      createCookie(res, authToken, process.env.NODE_ENV === "production");
      return res.status(200).json(user);
    }
    //user does not exist
    else {
      return res.status(404).json({ error: "USER_NOT_FOUND" });
    }
  })
);

app.post(
  "/users/register",
  validateUser,
  catchAsyncError(async (req, res) => {
    const userData = req.body;
    const foundUser = await User.findOne({ email: userData.email });
    //if user already exists then return error response
    if (foundUser) {
      return res.status(400).json({ error: "USER_ALREADY_EXISTS" });
    } else {
      //encrypt password with bcrypt
      const password = await bcrypt.hash(userData.password, saltRounds);
      //create new user
      const newUser = new User({ ...userData, password });
      //save user to database
      const user = await newUser.save();
      //create cookie to embed authToken
      const authToken = createToken(user, JWT_SECRET);
      createCookie(res, authToken, process.env.NODE_ENV === "production");
      return res.status(200).json(user);
    }
  })
);

app.patch(
  "/users/:id",
  isLoggedIn,
  validateUser,
  catchAsyncError(async (req, res) => {
    const userData = req.body;
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, userData);
    console.log("updatedUser",updatedUser)
    return res.status(200).json(updatedUser);
  })
);
app.delete(
  "/users/:id",
  isLoggedIn,
  catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.deleteOne({ id });
    return res.status(200).json(updatedUser);
  })
);

app.get(
  "/users/logout",
  catchAsyncError(async (req, res) => {
    createCookie(res, "", new Date(Date.now()));
    res.status(200).send();
  })
);
app.get(
  "/users/refresh",
  catchAsyncError(async (req, res) => {
    const { userId } = req.cookies;
    if (userId) {
      const decodedData = jwt.verify(userId, JWT_SECRET);
      const user = await User.findById(decodedData._id);
      if (user) {
        const authToken = createToken(user, JWT_SECRET);
        createCookie(res, authToken, process.env.NODE_ENV === "production");
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ error: "USER_NOT_FOUND" });
      }
    } else {
      return res.status(404).json({ error: "TOKEN_NOT_FOUND" });
    }
  })
);

app.all("*", (req, res, next) => {
  next(new customError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  console.log(`ERROR:\nat:${err.at}\n`, err);
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Something went wrong";
  res.status(err.statusCode).json({ error: err.message });
});
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
