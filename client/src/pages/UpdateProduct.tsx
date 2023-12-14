import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import api from "../config/api";
import {useNavigate, useParams } from "react-router-dom";

interface Supplier {
  supplier_id: number;
  supplier_name: string;
}

interface Product {
  category: string;
  manufacturer: string;
  description: string;
  supplierId: string;
  price: string;
  stock: string;
}

export function UpdateProduct() {
  const [error, setError] = useState("");
  const [suppliers, setSuppliers] = useState<null | Supplier[]>(null);
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  const { productId } = useParams();

  const navigate = useNavigate();

  const schema = yup.object().shape({
    category: yup.string().required(),
    manufacturer: yup.string().required(),
    description: yup.string().required("Please enter the description"),
    supplierId: yup.string().required(),
    price: yup.string().required("Please enter the price"),
    stock: yup.string().required("Please enter the stock amount"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /// get list of suppliers and product details from database
  useEffect(() => {
    api
      .get("/suppliers")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => setError(error.response?.data));

    api
      .get(`/products/${productId}`)
      .then((response) => {
        response.data[0].supplierId = response.data[0].supplier_id;
        delete response.data[0].supplier_id;
        delete response.data[0].product_id;
        setProductDetails(response.data[0])

        const { description, price, stock } = response.data[0];
        
        reset({
          description: description,
          price: price,
          stock: stock,
        });
      })
      .catch((error) => setError(error.response?.data));
  }, [reset]);

  function onSubmit(data: Product) {
    setError("");
    api
    .put(`/products/${productId}`, data)
    .then(()=>{
        navigate("/manage-products")
    })
    .catch((error) => setError(error.response?.data))
  }

  return (
    <main className="addProduct">
      <section>
        <h2>Category</h2>
        <select
          className="select"
          id="category"
          key={productDetails?.category}  /// to force the element to re-render after updating default value
          defaultValue={productDetails?.category}
          {...register("category")}
        >
          <option value="phone">Phone</option>
          <option value="watch">Watch</option>
          <option value="fridge">Fridge</option>
          <option value="microwave">Microwave</option>
        </select>
      </section>

      <section>
        <h2>Manufacturer</h2>
        <select
          className="select"
          id="manufacturer"
          key={productDetails?.manufacturer}
          defaultValue={productDetails?.manufacturer}
          {...register("manufacturer")}
        >
          <option value="lg">LG</option>
          <option value="hisense">Hisense</option>
          <option value="samsung">Samsung</option>
          <option value="sony">Sony</option>
          <option value="apple">Apple</option>
        </select>
      </section>

      <section>
        <h2>Description</h2>
        <textarea
          id=""
          placeholder="Description ..."
          {...register("description")}
        ></textarea>
      </section>

      <section>
        <h2>Supplier</h2>
        <select
          className="select"
          id="supplier"
          key={productDetails?.supplierId}
          defaultValue={productDetails?.supplierId}
          {...register("supplierId")}
        >
          {suppliers &&
            suppliers.map((supplier: Supplier) => {
              return (
                <option value={supplier.supplier_id}>
                  {supplier.supplier_name}
                </option>
              );
            })}
        </select>
      </section>

      <section>
        <h2>Price</h2>
        <input
          type="number"
          className="text"
          id="price"
          placeholder="Price..."
          {...register("price")}
        />
      </section>

      <section>
        <h2>Stock</h2>
        <input
          type="number"
          className="text"
          id="stock"
          placeholder="Stock..."
          {...register("stock")}
        />
      </section>

      <p style={{ color: "red" }}>
        {errors.category?.message ||
          errors.manufacturer?.message ||
          errors.description?.message ||
          errors.supplierId?.message ||
          errors.price?.message ||
          errors.stock?.message ||
          error}
      </p>

      <button onClick={handleSubmit(onSubmit)}>Submit</button>
    </main>
  );
}
