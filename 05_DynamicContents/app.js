if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const path = require("path");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const express = require("express");
const bodyParser = require("body-parser");

const { get404 } = require("./controllers/error");

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
/**The Sequelize belongsTo() method allows you to create a One-To-One (1:1)
relationship between two Sequelize models.

cascade means if u delete User, the products created by the user gets deleted too
**/
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
//one user can add more than one products
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
