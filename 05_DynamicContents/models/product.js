// const products = [];

const { v4: uuid } = require("uuid");
const db = require("../util/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {}

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id, cb) {}
};

//filter
// const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
// const result = words.filter(word => word.length != 5);
// console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
