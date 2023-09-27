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
  static Products() {
    return {
      find: () => {
        return {
          all: async () => {
            let results =  await Database.query(`SELECT * FROM products`);
            return results;
          },
          where: async (column, value) => {
            let results =  await Database.query(
              `SELECT * FROM products WHERE ${column} = "${value}"`
            );
            return results;
          },
        };
      },

      add: async (columns, values) => {
        let results =  await Database.query(
          `INSERT INTO products(${columns}) VALUES (${values})`
        );
        return results;
      },

      update: async (columnToEdit, newValue, column, value) => {
        let results =  await Database.query(
          `UPDATE products SET ${columnToEdit} = "${newValue}" WHERE ${column} = "${value}"`
        );
        return results;
      },

      remove: async (column, value) => {
        let results =  await Database.query(
          `DELETE FROM products WHERE  ${column} = "${value}"`, 
        );
        return results;
      },
    };
  }

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
