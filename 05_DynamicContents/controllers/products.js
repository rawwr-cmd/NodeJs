const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  // console.log(req.body);
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  //   console.log("shop.js", adminData.products);
  //   res.sendFile(path.join(rootDir, "views", "shop.html"));
  //   const products = adminData.products;
  const products = Product.fetchAll();
  res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
};
