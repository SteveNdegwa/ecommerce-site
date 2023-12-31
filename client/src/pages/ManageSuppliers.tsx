import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

interface Supplier {
  supplier_id: string;
  supplier_name: string;
}
export function ManageSuppliers() {
  const [error, setError] = useState("");
  const [suppliersList, setSuppliersList] = useState<Supplier[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/suppliers")
      .then((response) => setSuppliersList(response.data))
      .catch((error) => setError(error.response.data || "An error occurred"));
  });

  function updateSupplier(supplierId: string) {
    return navigate(`/update-supplier/${supplierId}`);
  }

  function deleteSupplier(supplierId: string) {
    setError("");
    api
      .get(`/products/supplier/${supplierId}`)
      .then((response) => {
        if (response.data.length)
          return setError(
            "There exists this supplier's products in the database"
          );
        else {
          api
            .delete(`/suppliers/${supplierId}`)
            .then(() => {
                suppliersList && suppliersList.filter((supplier: Supplier)=> supplier.supplier_id !== supplierId);
            })
            .catch((error) =>
              setError(error.response.data || "An error occurred")
            );
        }
      })
      .catch((error) => setError(error.response.data || "An error occurred"));
  }

  return (
    <main className="manageSuppliers">
      <table>
        <thead>
          <tr>
            <th>Supplier's Id</th>
            <th>Supplier's Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {suppliersList &&
            suppliersList.map((supplier: Supplier) => {
              return (
                <tr>
                  <td>{supplier.supplier_id}</td>
                  <td>{supplier.supplier_name}</td>
                  <td>
                    <button
                      id={supplier.supplier_id}
                      onClick={(e) => updateSupplier(e.currentTarget.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      id={supplier.supplier_id}
                      onClick={(e) => deleteSupplier(e.currentTarget.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <p style={{ color: "red" }}>{error}</p>
    </main>
  );
}
