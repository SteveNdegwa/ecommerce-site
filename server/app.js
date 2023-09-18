const express = require("express");
const app = express();

let products = [
    {
        id: 1,
        title: "book",
        description: "green",
        available: true
    },
    {
        id: 2,
        title: "pen",
        description: "red",
        available: true
    }
]


app.get("/products", (req,res)=>{
    res.json(products);
})

app.put("/products", (req,res)=>{
    products.push({
        id: 4,
        title: "shirt",
        description: "blue",
        available: true
    })
    res.json(products)
})

app.get("/products/:id", (req,res)=>{
    const product = products.find((product)=> product.id == req.params.id)
    res.json(product)
})

app.post("/products/:id", (req,res)=>{
    const newproducts = products.map((product)=>{
        if(product.id == req.params.id){
            return {...product, available: false}
        }else{
            return product;
        }
    })
    products = newproducts;
    res.json(newproducts)
})

app.delete("/products/:id", (req,res)=>{
    const newproducts = products.filter((product)=> product.id != req.params.id)
    products = newproducts;
    res.json(newproducts)
})


app.listen(3000, ()=> {console.log(`server strated on port 3000`)})
