const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const notFoundRoutes = require("./routes/page-not-found");

app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(notFoundRoutes);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
