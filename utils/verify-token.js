const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    res.status(401);
    return next(new Error("Access Denied"));
  }

  try {
    token = token.split("bearer ")[1];
    const verified = jwt.verify(token, process.env.Token);
    req.user = verified;
    // req.user = {
    //   _id: decoded_token.userId,
    //   isAdmin: decoded_token.isAdmin,
    // };

    return next();
  } catch (e) {
    res.status(400);
    return next(new Error("invalid token"));
  }
};
