const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err)
        return res.status(403).json({
          success: false,
          message: "Token is not valid!",
        });
      req.user = payload;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "You are not authenticated!" });
  }
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    return res
      .status(401)
      .json({ success: false, message: "You are not the admin" });
  }
}
module.exports = { isAuth, isAdmin };
