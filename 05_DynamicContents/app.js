if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const path = require("path");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const cartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

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

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

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
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: cartItem });
Product.belongsToMany(Cart, { through: cartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync({ force: true })
  // .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Papa Jones",
        email: "papajones@gmail.com",
      });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
