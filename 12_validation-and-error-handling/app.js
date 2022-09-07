if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const { get404, get500 } = require("./controllers/error");
const User = require("./models/user");

const app = express();
const store = new mongoDbStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

const csrfProtection = csrf();

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
    expires: Date.now() + 8 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionConfig));
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

//middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", get500);
app.use(get404);

app.use((error, req, res, next) => {
  res.redirect("/500");
});

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(3000, () => {
      console.log("The application is running on localhost 3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
