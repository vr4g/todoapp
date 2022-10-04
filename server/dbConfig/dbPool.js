const { Pool } = require("pg");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

let pool = new Pool();

pool.connect(function (error) {
  error ? console.log(error) : console.log("Connected to DB");
});

module.exports = pool;
