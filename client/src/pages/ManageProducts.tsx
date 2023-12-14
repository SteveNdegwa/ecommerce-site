import { useEffect, useState } from "react";
import api from "../config/api";
import { UpdateProduct } from "./updateProduct";
import { useNavigate } from "react-router-dom";

interface Product{
    product_id: string
    category: string
    manufacturer: string
    description: string
    supplier_id: string
    price: string
    stock: string
}

export function ManageProducts() {
  const [productsList, setProductsList] = useState<Product[] | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProductsList(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  });

  function deleteProduct(productId: string){
    setError("");
    api
    .delete(`/products/${productId}`)
    .then(()=>{
        productsList && productsList.filter((product: Product)=> product.product_id !== productId);
    })
    .catch((error)=>{
        setError(error.response.data);
    })
  }

  function updateProduct(productId: string){
    return navigate(`/update-product/${productId}`);
  }

  return (
    <main className="manageProducts">
      <table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Category</th>
            <th>Manufacturer</th>
            <th>Description</th>
            <th>Supplier Id</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productsList &&
            productsList.map((product: Product) => {
              return (
                <tr>
                  <td>{product.product_id}</td>
                  <td>{product.category}</td>
                  <td>{product.manufacturer}</td>
                  <td>{product.description}</td>
                  <td>{product.supplier_id}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td><button id={product.product_id}  onClick={(e)=>updateProduct(e.currentTarget.id)}>Update</button></td>
                  <td><button id={product.product_id} onClick={(e)=>deleteProduct(e.currentTarget.id)}>Delete</button></td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <p style={{color: "red"}}>{error}</p>
    </main>
  );
}
