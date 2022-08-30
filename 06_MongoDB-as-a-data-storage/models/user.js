const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // { items: [] }
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    console.log(cartProductIndex);
    let newQuantity = 1;

    const updatedCartItems = [...this.cart.items];
    //updating if the product is already in the cart
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    //adding new product to cart
    else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );

    // firsttime
    // const updatedCart = {
    //   items: [{ productId: new ObjectId(product._id), quantity: 1 }],
    // };
    // const db = getDb();
    // return db
    //   .collection("users")
    //   .updateOne(
    //     { _id: new ObjectId(this._id) },
    //     { $set: { cart: updatedCart } }
    //   );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    console.log(productIds);
    //toArray - to convert it into js array
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();
    return db
      .collection("orders")
      .insertOne(this.cart)
      .then((result) => {
        //emptying the cart after ordering
        this.cart = { items: [] };
        //emptying the cart from the database
        return db.collection("users").updateOne(
          { _id: new ObjectId(this._id) }, //searching for the user
          { $set: { cart: { items: [] } } }
        );
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        // console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = User;
