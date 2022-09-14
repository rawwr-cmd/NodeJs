const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { email, name, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        name: name,
        password: hashedPw,
      });
      return user.save();
    })
    //if the user is succesfully saved/created in the database
    .then((result) => {
      //The HTTP 201 Created success status response code
      // indicates that the request has succeeded and has led to the creation of a resource.
      res.status(201).json({ message: "User Created!", userId: result._id });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err); //since async
    });
};
