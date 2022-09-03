if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);

const { get404 } = require("./controllers/error");
const User = require("./models/user");

const app = express();
const store = new mongoDbStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

app.set("view engine", "ejs");
// app.set("view engine", "pug");
app.set("views", "views");

//routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const sessionConfig = {
  store: store,
  secret: "my secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    name: "session",
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionConfig));

app.use((req, res, next) => {
  User.findById("6311c656b7aeedb3de7112cb")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "rawwr",
          email: "rawwr69@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000, () => {
      console.log("The application is running on localhost 3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
