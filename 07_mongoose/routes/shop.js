const path = require("path");

const express = require("express");

const {
  getProducts,
  getIndex,
  getCart,
  getOrders,
  getProductDetail,
  postCart,
  postCartDeleteProduct,
  postOrder,
} = require("../controllers/shop");

const router = express.Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProductDetail);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.post("/cart-delete-item", postCartDeleteProduct);
router.post("/create-order", postOrder);
// router.get("/orders", getOrders);

module.exports = router;
