const mongodb = require("mongodb");
const { MongoClient } = require("mongodb");

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.DB_URL)
    .then((client) => {
      console.log(client);
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
