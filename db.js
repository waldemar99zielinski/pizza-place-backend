const { static } = require("express");
const { Pool } = require("pg");

const pool = new Pool({});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("[ERROR] ", err, res);
  } else {
    console.log("[INFO] Database connected successfully");
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
