const express = require("express");
const app = express();

const productsRoute = require("./routes/products") 
const usersRoute = require("./routes/users")

app.use("/products", productsRoute)
app.use("/users", usersRoute);


app.listen(3000, ()=> {console.log(`server started on port 3000`)})
