const UserModel = require("../models/UserModel");

class UsersController {
  static async getAllUsers(req, res, next) {
    try {
      const result = await UserModel.getAllUsers();
      return res.json(result);
    } catch (error) {
      return res.status(500).json("Server error")
    }
  }

  static async getUser(req, res, next) {
    try {
      const result = await UserModel.getUser(req.params.credential);
      return res.json(result);
    } catch (error) {
      return res.status(500).json("Server error")
    }
  }

  static async addUser(req, res, next) {
    try {
      const email = await UserModel.getUser(req.body.email);
      if (email.length) return res.status(200).json("The email already exists");
  
      const username = await UserModel.getUser(req.body.username);
      if (username.length) return res.status(200).json("The username is already taken");
  
      const User = new UserModel(
        req.body.username,
        req.body.email,
        req.body.password
      );
      const result = await User.addUser();
      return res.status(201).json(result);

    } catch (error) {
      return res.status(500).json("Server error")
    }
  }

  static async updateUser(req, res, next) {
    try {
      const email = await UserModel.getOtherUser(req.body.email, req.user.user_id);
      if (email.length) return res.status(200).json("The email already exists");
  
      const username = await UserModel.getOtherUser(req.body.username, req.user.user_id);
      if (username.length) return res.status(200).json("The username is already taken");
  
      const User = new UserModel(
        req.body.username,
        req.body.email,
        req.body.password
      );
      const result = await User.updateUser(req.params.id);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json("Server error")
    }
  }

  static async deleteUser(req, res, next) {
   try {
     const result = await UserModel.deleteUser(req.params.id);
     return res.json(result);
   } catch (error) {
    return res.status(500).json("Server error")
   }
  }
}

module.exports = UsersController;
