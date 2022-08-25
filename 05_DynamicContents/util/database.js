const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.database,
  password: process.env.password,
});

module.exports = pool.promise();
