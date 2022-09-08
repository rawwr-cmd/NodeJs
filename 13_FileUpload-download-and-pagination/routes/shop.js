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
  getInvoice,
} = require("../controllers/shop");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProductDetail);
router.get("/cart", isAuth, getCart);
router.post("/cart", isAuth, postCart);
router.post("/cart-delete-item", isAuth, postCartDeleteProduct);
router.post("/create-order", isAuth, postOrder);
router.get("/orders", isAuth, getOrders);

router.get("/orders/:orderId", isAuth, getInvoice);

module.exports = router;
