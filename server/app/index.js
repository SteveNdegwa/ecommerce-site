const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const productsRoute = require("./routes/products") 
const usersRoute = require("./routes/users")
const suppliersRoute = require("./routes/suppliers")
const loginRoute = require("./routes/login")

app.use("/products", productsRoute)
app.use("/users", usersRoute);
app.use("/suppliers", suppliersRoute);
app.use("/login", loginRoute);


app.listen(3000, ()=> {console.log(`server started on port 3000`)})
