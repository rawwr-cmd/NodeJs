const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //getting the header from the request
  const authHeader = req.get("Authorization");
  //if there is no header
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  //split the authorization header into an array aka split the string at the space
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "rawwrisamaal");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  //decording the userid from the token
  req.userId = decodedToken.userId;
  next();
};
