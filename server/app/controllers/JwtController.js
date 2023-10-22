const jwt = require("jsonwebtoken");
const randtoken = require("rand-token")
const UserModel = require("../models/UserModel");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const refreshTokens = {};


class JwtController{
  static async getToken(req, res, next) {
    const result = await UserModel.getUser(req.body.credential);
    if (!result.length) return res.status(200).json("incorrect username or passowrd");
    const user = JSON.parse(JSON.stringify(result[0]));
  
    /// hash the entered password
    let password = req.body.password; /// hashed
    if (user.password !== password)
      return res.status(200).json("incorrect username or password");
  
    delete user.password;
    const token = jwt.sign(user, jwtSecretKey, { expiresIn: "1h" });
  
    const refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken] = user.username;
    res.status(201).json({username:user.username, token:token, refreshToken: refreshToken});

    console.log(refreshTokens);
    next();
  }
  
  
  static async verifyToken(req, res, next) {
    if(req.headers.authorization){
      try {
        const token = (req.headers.authorization).replace("Bearer ", "");
        console.log("token",token);
        const user = jwt.verify(token, jwtSecretKey);
        req.user = user;
        console.log("verified");
        return next();
      } catch (error) {
        return res.status(401).json("invalid access token");
      }
    };
    return res.status(401).json("no access token");
  }
  
  static async refreshToken(req,res,next){
    const refreshToken = req.body.refreshToken;
    const username = req.body.username;
  
    if(refreshToken in refreshTokens && refreshTokens[refreshToken] === username){
      const result = await UserModel.getUser(username);
      const user = JSON.parse(JSON.stringify(result[0]));
      delete user.password;
      const token = jwt.sign(user, jwtSecretKey, { expiresIn: "1h" });
      return res.status(200).json({token:token});
    }

    return res.status(401).json("Invalid refresh token");
  }
}

module.exports = JwtController;
