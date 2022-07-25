const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app;

app.listen(8080, () => {
  console.log("listening on port 8080");
});
