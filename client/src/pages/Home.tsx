import { useEffect, useState } from "react";
import api from "../config/api";

interface Product {
  product_id: string;
  category: string;
  manufacturer: string;
  description: string;
  supplier_id: string;
  price: number;
  stock: number;
}
export function Home() {
  const [productsList, setProductsList] = useState<Product[] | null>(null);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => setProductsList(response.data))
      .catch((error) => alert(error.response.data || "An error occurred"));
  }, []);

  return (
    <main className="home">
      <section className="landing"></section>  
      <section className="products">
        {productsList && productsList.map((product:Product)=>{
            return(
                <div className="product">
                    <h3>Category: {product.category}</h3>
                    <h3>Manufacturer: {product.manufacturer}</h3>
                    <h3>Description: {product.description}</h3>
                    <h3>Units : {product.stock}</h3>
                    <h3>Price: Kshs. {product.price}</h3>
                </div>
            )
        })}
      </section>
    </main>
  );
}
