const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err)
        return res.json({
          statusCode: 401,
          errors: [
            {
              field: "token",
              message: "Token has expired!",
            },
          ],
        });
      req.user = payload;
      next();
    });
  } else {
    return res.json({
      statusCode: 401,
      errors: [{ field: "token", message: "You are not authenticated!" }],
    });
  }
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.json({
      statusCode: 403,
      errros: [{ field: "token", message: "You are not the admin" }],
    });
  }
}
module.exports = { isAuth, isAdmin };
