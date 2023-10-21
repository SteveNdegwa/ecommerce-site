const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

async function authenticate (req, res, next){
  const result = await UserModel.getUser(req.body.credential);
  if(!result.length) return res.json("incorrect username or passowrd");
  const user = JSON.parse(JSON.stringify(result[0]));

  /// hash the entered password
  let password = req.body.password/// hashed
  if (user.password !== password) return res.json("incorrect username or passowrd");
  delete user.password;
  const token = jwt.sign(user, jwtSecretKey, { expiresIn: "1h" });
  res.cookie("token", token, {
    httpOnly: true,
  });
  return res.json("success")

};

function authorize(req, res, next){
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, jwtSecretKey);
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.redirect("http://localhost:5173/login")
    }
}

module.exports = {authenticate, authorize};
