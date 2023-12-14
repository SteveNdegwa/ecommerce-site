const express = require("express");
const app = express();

const cors = require("cors")
app.use(cors({
    origin: "http://localhost:5173",
    methods:['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const productsRoute = require("./routes/products") 
const usersRoute = require("./routes/users")
const suppliersRoute = require("./routes/suppliers")
const jwtRoute = require("./routes/jwt")

app.use("/products", productsRoute)
app.use("/users", usersRoute);
app.use("/suppliers", suppliersRoute);
app.use("/jwt", jwtRoute);


app.listen(3000, ()=> console.log(`server started on port 3000`));
