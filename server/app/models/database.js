////// not an actual database

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


const getAllProducts = (req,res)=>{
    return res.json(products);
}

const addProduct = (req,res)=>{
    products.push({
        id: 4,
        title: "shirt",
        description: "blue",
        available: true
    })
    res.json(products)
}
const getSpecificProduct = (req,res)=>{
    const product = products.find((product)=> product.id == req.params.id)
    res.json(product)
}

const updateProduct = (req,res)=>{
    const newproducts = products.map((product)=>{
        if(product.id == req.params.id){
            return {...product, available: false}
        }else{
            return product;
        }
    })
    products = newproducts;
    res.json(products)
}

const deleteProduct = (req,res)=>{
    const newproducts = products.filter((product)=> product.id != req.params.id)
    products = newproducts;
    res.json(products)
}


module.exports = {getAllProducts, addProduct, getSpecificProduct, updateProduct, deleteProduct};