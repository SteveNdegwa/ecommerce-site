import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from"yup";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

interface FormData{
    name: string
}

export function AddSupplier(){
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required("Please enter the supplier's name").min(4,"The supplier's name is too short")
    })

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmitForm(data: FormData){
        setError("");
        api
        .post(`/suppliers`, data)
        .then((response)=>{
            if(response.status !== 201) return setError(response.data);
            return navigate("/manage-suppliers")
        })
        .catch((error)=> setError(error.response.data || "An error occurred"))
    }

    return(
        <main className="addSupplier">
            <input type="text"  placeholder="Enter supllier's name ..." {...register("name")}/>
            <button onClick={handleSubmit(onSubmitForm)}>Submit</button>
            <p style={{color:"red"}}>{errors.name?.message || error}</p>
        </main>
    )
}