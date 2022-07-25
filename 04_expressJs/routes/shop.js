const express = require("express");

const path = require("path");
const router = express.Router();
const rootDir = require("../utils/path");

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
  //   console.log("In the another middleware");
  //...
});

module.exports = router;
