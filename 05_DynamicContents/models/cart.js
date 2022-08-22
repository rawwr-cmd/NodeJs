const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //finding the existing product
      const existingProduct = cart.products.find(
        (product) => product.id === id
      );
      let updatedProduct;
      //for existing product
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        //for updated product
      } else {
        updatedProduct = { id, qty: 1 };
        Cart.products = [...cart.products];
      }
      Cart.totalPrice += productPrice;

      updatedProduct;
    });
  }
};
