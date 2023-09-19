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

class ProductsDatabase{

    static getAllProducts = (req,res)=>{
        return res.json(products);
    }
    
    static addProduct = (req,res)=>{
        products.push({
            id: 4,
            title: "shirt",
            description: "blue",
            available: true
        })
        res.json(products)
    }

    static getSpecificProduct = (req,res)=>{
        const product = products.find((product)=> product.id == req.params.id)
        res.json(product)
    }
    
    static updateProduct = (req,res)=>{
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
    
    static deleteProduct = (req,res)=>{
        const newproducts = products.filter((product)=> product.id != req.params.id)
        products = newproducts;
        res.json(products)
    }
}


module.exports = ProductsDatabase;