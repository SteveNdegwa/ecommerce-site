const Database = require("../services/Database");

class UserModel {
  constructor(username, email, password) {
    this.columns = {
      username: "username",
      email: "email",
      password: "password",
    };
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async getAllUsers() {
    let result = await Database.query("SELECT * FROM users");
    return result;
  }

  static async getUser(credential) {
    let result = await Database.query(
      `SELECT * FROM users WHERE user_id = '${credential}' OR username = '${credential}' OR email = '${credential}'`
    );
    return result;
  }

  async addUser() {
    let result = await Database.query(
      `INSERT INTO users(${Object.values(this.columns)}) VALUES('${
        this.username
      }', '${this.email}', '${this.password}')`
    );
    return result;
  }

  async updateUser(id) {
    let result = await Database.query(
      `UPDATE users SET ${this.columns.username} = '${this.username}', ${this.columns.email} = '${this.email}', ${this.columns.password} = '${this.password}' WHERE user_id  = '${id}'`
    );
    return result;
  }

  static async deleteUser(id) {
    let result = await Database.query(
      `DELETE FROM users WHERE user_id = '${id}'`
    );
    return result;
  }
}

module.exports = UserModel;
