const mongodb = require("mongodb");
const { MongoClient } = mongodb;

let _db;

//storing and creating the database
const mongoConnect = (callback) => {
  MongoClient.connect(process.env.DB_URL)
    .then((client) => {
      console.log("CONNECTED!!!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

//access the database
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
