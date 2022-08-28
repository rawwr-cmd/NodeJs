const mongodb = require("mongodb");
const { MongoClient } = require("mongodb");

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://rawwr:akki4546@cluster0.yks19wz.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log(client);
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
