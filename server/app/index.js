const express = require("express");
const app = express();

const productsRoute = require("./routes/products") 


app.use("/products", productsRoute)


app.listen(3000, ()=> {console.log(`server started on port 3000`)})
