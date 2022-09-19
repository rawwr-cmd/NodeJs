const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //getting the header from the request
  const authHeader = req.get("Authorization");
  //if there is no header
  if (!authHeader) {
    req.isAuth = false; //set the isAuth to false
    return next();
  }

  //split the authorization header into an array aka split the string at the space
  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "rawwrisamaal");
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  //decording the userid from the token
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};
