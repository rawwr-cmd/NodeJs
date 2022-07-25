const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  //   console.log("a middleware for all routes");
  next();
});

app.use("/add-product", (req, res, next) => {
  //   console.log("we got a new request");
  //   console.dir(req);
  //   res.send("HELLO, WE GOT YOUR REQUEST");
  //   res.send({ color: "red" });
  //   console.log("IN THE MIDDLEWARE");
  res.send(
    '<form action="/product" method="POST"><input type="text" name="product"><button type="submit">Add Product</button></form>'
  );
  //   next(); //allows the request to continue to the next middleware in line
});

app.use("/product", (req, res, next) => {
  //   console.log("In another middleware");
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>The home page</h1>");
  //   console.log("In the another middleware");
  //...
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
