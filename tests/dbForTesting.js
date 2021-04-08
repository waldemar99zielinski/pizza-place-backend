const { Pool } = require("pg");
const dbConfig = require("./dbConfig");
const pool = new Pool(dbConfig);

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("[ERROR] ", err, res);
  } else {
    console.log("[INFO] Database connected successfully");
  }
});

module.exports = {
  client: () => pool.connect(),
  query: (text, params) => pool.query(text, params),
};
