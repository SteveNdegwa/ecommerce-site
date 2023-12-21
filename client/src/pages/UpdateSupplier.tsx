import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../config/api";

interface FormData{
    name: string
}

export function UpdateSupplier() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(4, "The supplier's name is too short")
      .required("Please enter the supplier's name"),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { supplierId } = useParams();

  useEffect(() => {
    api
      .get(`/suppliers/${supplierId}`)
      .then((response) => {
        reset({ name: response.data[0].supplier_name})
      })
      .catch((error) => setError(error.response.data || "An error occurred"));
  }, [reset]);

  function onSubmitForm(data: FormData) {
    setError("");
    api
    .put(`/suppliers/${supplierId}`, data)
    .then(() => navigate("/manage-suppliers"))
    .catch((error) => setError(error.response.data || "An error occurred"));
  }

  return (
    <main className="updateSupplier">
      <input
        type="text"
        placeholder="Enter new supplier's name"
        {...register("name")}
      />
      <button onClick={handleSubmit(onSubmitForm)}>Update</button>
      <p style={{ color: "red" }}>{errors.name?.message || error}</p>
    </main>
  );
}
