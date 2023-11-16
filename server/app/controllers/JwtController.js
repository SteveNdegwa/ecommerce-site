const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");
const UserModel = require("../models/UserModel");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const refreshTokens = {};


class JwtController{
  static async getToken(req, res, next) {
    const result = await UserModel.getUser(req.body.credential);
    if (!result.length) return res.status(200).json("Incorrect username or passowrd");
    const user = JSON.parse(JSON.stringify(result[0]));
  
    /// hash the entered password
    let password = req.body.password; /// hashed
    if (user.password !== password)
      return res.status(200).json("Incorrect username or password");
  
    delete user.password;
    const accessToken = jwt.sign(user, jwtSecretKey, { expiresIn: "1h" });
  
    const refreshToken = randtoken.uid(256);
    refreshTokens[user.username] = refreshToken;

    res.cookie("accessToken", accessToken, {httpOnly: true});
    res.cookie("refreshToken", refreshToken, {maxAge: 1000*60*60*24, httpOnly: true})
    res.status(201).json({username: user.username});
    next();
  }
  
  
  static async verifyToken(req, res, next) {
    if(req.cookies["accessToken"]){
      try {
        const accessToken = req.cookies["accessToken"];
        const user = jwt.verify(accessToken, jwtSecretKey);
        req.user = user;
        return next();
      } catch (error) {
        return res.status(401).json("Invalid access token");
      }
    };
    return res.status(401).json("No access token");
  }
  
  static async refreshToken(req,res,next){
    const refreshToken = req.cookies["refreshToken"];
    const username = req.body.username;
  
    if(username in refreshTokens && refreshTokens[username] === refreshToken){
      const result = await UserModel.getUser(username);
      const user = JSON.parse(JSON.stringify(result[0]));
      delete user.password;

      // create a new access token and a new refresh token
      const accessToken = jwt.sign(user, jwtSecretKey, { expiresIn: "1h" });

      refreshTokens[username] = undefined;
      const refreshToken = randtoken.uid(256);
      refreshTokens[username] = refreshToken;

      /// save access and refresh tokens in cookies
      res.cookie("accessToken", accessToken, {httpOnly: true});
      res.cookie("refreshToken", refreshToken, {maxAge: 1000*60*60*24, httpOnly: true})

      return res.status(201).json("Successful access token refresh");
    }

    return res.status(401).json("Invalid access token refresh");
  }

  static async revokeUserToken(req,res,next){
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    if(refreshTokens[req.params.username]){refreshTokens[req.params.username] = undefined};
    return res.status(200).json("Tokens successfully revoked");
  }

  static async revokeAllRefreshTokens(req,res,next){
    refreshTokens = {};
    return res.status(200).json("Refresh tokens successfully revoked")
  }
}

module.exports = JwtController;
