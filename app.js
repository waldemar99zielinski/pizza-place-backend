const express = require("express");
const cors = require("cors");
const { Pool, Client } = require("pg");
const app = express();

app.use(cors());

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

app.get("/", (request, response) => {
  pool.query("SELECT * FROM customer", (error, results) => {
    if (error) {
      console.log(error);
    }
    response.status(200).json(results);
  });
});

module.exports = app;
