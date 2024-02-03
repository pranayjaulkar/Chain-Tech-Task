const createCookie = (
  res,
  authToken,
  secure = false,
  expiresIn = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
) => {
  return res.cookie("userId", authToken, {
    httpOnly: true,
    secure,
    expires: expiresIn,
  });
};
module.exports = createCookie;
