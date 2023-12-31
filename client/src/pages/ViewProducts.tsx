import { useEffect, useState } from "react";
import api from "../config/api";
import { useParams } from "react-router-dom";
import { addToCart } from "../store";
import { useDispatch } from "react-redux";

interface Product {
  product_id: string;
  category: string;
  manufacturer: string;
  description: string;
  supplier_id: string;
  price: number;
  stock: number;
}

export function ViewProducts() {
  const [productsList, setProductsList] = useState([]);

  const dispatch = useDispatch();
  const { productCategory } = useParams();
  
  useEffect(() => {

    api
      .get( productCategory === "all" ? `/products` : `/products/search/${productCategory}`)
      .then((response) => {
        setProductsList(response.data)
      })
      .catch((error) => alert(error.response.data || "An error occurred"));
  });

  
  return (
    <main className="viewProducts">
      {productsList.length ? (
        productsList.map((product: Product) => {
          return (
            <div className="product">
              <div className="productDetails">
              <h3>Category: {product.category}</h3>
              <h3>Manufacturer: {product.manufacturer}</h3>
              <h3>Description: {product.description}</h3>
              <h3>Units : {product.stock}</h3>
              <h3>Price: Kshs. {product.price}</h3>
              </div>
              <button onClick={()=> dispatch(addToCart({productId: product.product_id, productName: `${product.manufacturer}  ${product.category}  ${product.description}`, noOfProducts:1, productPrice: product.price, productStock: product.stock}))}>Add</button>
            </div>
          );
        })
      ) : (
        <h2 style={{color:"dimGray"}}>No products available</h2>
      )}
    </main>
  );
}
