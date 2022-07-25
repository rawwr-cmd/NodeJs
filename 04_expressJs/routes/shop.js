const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<h1>The home page</h1>");
  //   console.log("In the another middleware");
  //...
});

module.exports = router;
