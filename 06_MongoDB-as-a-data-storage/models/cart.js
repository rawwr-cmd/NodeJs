const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;

//const fruits = ["apple", "banana", "cantaloupe", "blueberries", "grapefruit"];
// const index = fruits.findIndex((fruit) => fruit === "blueberries");
// console.log(index); // 3
// console.log(fruits[index]); // blueberries
