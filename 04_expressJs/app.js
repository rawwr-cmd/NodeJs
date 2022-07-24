const http = require("http");
const express = require("express");
const app = express();

app.use((req, res, next) => {
  //   console.log("we got a new request");
  //   console.dir(req);
  //   res.send("HELLO, WE GOT YOUR REQUEST");
  //   res.send({ color: "red" });
  console.log("IN THE MIDDLEWARE");
  next(); //allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
  console.log("In the another middleware");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
