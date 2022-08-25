if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { get404 } = require("./controllers/error");
const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
// app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(3000);
