const express = require("express");
const { check } = require("express-validator");

const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword,
} = require("../controllers/auth");

const router = express.Router();

router.get("/login", getLogin);
router.get("/signup", getSignup);

router.post("/login", postLogin);
router.post("/signup", check("email").isEmail(), postSignup);
router.post("/logout", postLogout);

router.get("/password-reset", getReset);
router.post("/password-reset", postReset);

router.get("/password-reset/:token", getNewPassword);

router.post("/new-password", postNewPassword);

module.exports = router;
