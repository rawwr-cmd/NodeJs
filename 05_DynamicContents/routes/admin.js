const express = require("express");

// const rootDir = require("../util/path");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
} = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", getAddProduct);
router.get("/products", getProducts);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

// /admin/edit-product/:productId => GET
router.get("/edit-product/:productId", getEditProduct);

module.exports = router;
