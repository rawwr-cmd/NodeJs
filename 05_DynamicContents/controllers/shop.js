const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  //   console.log("shop.js", adminData.products);
  //   res.sendFile(path.join(rootDir, "views", "shop.html"));
  //   const products = adminData.products;
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  const { productId } = req.params;
  // console.log(productId);
  Product.findById(productId, (product) => {
    // console.log(product);
    res.render("shop/product-details", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  console.log(productId);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Your Checkout",
  });
};
