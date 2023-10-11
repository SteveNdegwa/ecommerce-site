const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

async function authenticate (req, res, next){
  const result = await UserModel.getUser(req.body.credential);
  const user = JSON.parse(JSON.stringify(result[0]));
  if (!user) return res.json("user does not exist");

  /// hash the entered password
  let password = req.body.password/// hashed
  if (user.password !== password) return res.json("incorrect username or passowrd");
  delete user.password;
  const token = jwt.sign(user, jwtSecretKey, { expiresIn: "1h" });
  res.cookie("token", token, {
    httpOnly: true,
  });
  // redirect to homepage
  return res.json("homepage")

};

function authorize(req, res, next){
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, jwtSecretKey);
        next();
    } catch (error) {
        res.clearCookie("token");
        // redirect to login page
        return res.json("login")
    }
}

module.exports = {authenticate, authorize};
