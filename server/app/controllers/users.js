const UserModel = require("../models/user-model");

class UsersController{
    static async getAllUsers(req, res, next){
        const result  = await UserModel.getAllUsers();
        return res.json(result);
    }

    static async getUser(req, res, next){
        const result  = await UserModel.getUser(req.params.credential);
        return res.json(result);
    }


    static async addUser(req, res, next){
        const email = await UserModel.getUser(req.body.email);
        if(email.length) return res.json("The email already exists")

        const username = await UserModel.getUser(req.body.username);
        if(username.length) return res.json("The username is already taken");

        const User = new UserModel(req.body.username, req.body.email, req.body.password);
        const result = User.addUser();
        return res.json(result);
    } 

    static async updateUser(req, res, next){
        const User = new UserModel(req.body.username, req.body.email, req.body.password);
        const result = User.updateUser(req.params.id);
        return res.json(result);
    }
    
    static async deleteUser(req, res, next){
        const result  = await UserModel.deleteUser(req.params.id);
        return res.json(result);
    }
}

module.exports = UsersController;
