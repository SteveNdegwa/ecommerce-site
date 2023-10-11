const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

class Database {
    static query(query) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) reject(err);
        connection.query(query, (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
        connection.release();
      });
    });
  }
}


module.exports = Database;
