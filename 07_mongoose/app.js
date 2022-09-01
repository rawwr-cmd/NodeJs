if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { get404 } = require("./controllers/error");
const { mongoConnect } = require("./util/database");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
// app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("630d092a16fdb59dc6d1e053")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

mongoConnect(() => {
  app.listen(3000);
});
