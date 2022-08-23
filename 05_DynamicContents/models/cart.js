const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  // fetch the previous cart
  static addProduct(id, productPrice) {
    //passing the path with the callback
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //finding the existing product
      //if the product id matches the id we are  passing then we will add one more to the quantity
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );

      // console.log(existingProductIndex);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      //add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
        //for new product
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};

//const fruits = ["apple", "banana", "cantaloupe", "blueberries", "grapefruit"];
// const index = fruits.findIndex((fruit) => fruit === "blueberries");
// console.log(index); // 3
// console.log(fruits[index]); // blueberries
