import { useState } from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface FormData {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export function CreateAccount(){

    const [error, setError] = useState("")

    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup.string().min(4, "Username must be 4 characters or more").required("Please enter your username"),
        email: yup.string().email("Invalid email address").required("Please enter your email address"),
        password: yup.string().min(7, "Weak password").required("Please enter your password"),
        confirmPassword: yup.string().oneOf([yup.ref("password")],"Passwords don't match").required("Please confirm your password"),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    async function onFormSubmit(data: FormData){
        setError("");
        await axios.post("http://localhost:3000/users", data)
        .then((response)=>{
            if(response.data?.insertId){
                navigate("/login");
            }else{
                setError(response.data);
            }
        })
        .catch((err)=> console.log(err))
    }

    return(
        <div className="createAccount">
            <form className="createAccountForm">
                <input type="text" placeholder="Username..." {...register("username")}/>
                <input type="text" placeholder="Email address..." {...register("email")}/>
                <input type="password" placeholder="Password..." {...register("password")}/>
                <input type="password" placeholder="Confirm password..." {...register("confirmPassword")}/>
                <p style={{color: "red"}}>{
                    errors.username?.message || errors.email?.message || errors.password?.message || errors.confirmPassword?.message || error
                }</p>
                <button onClick={handleSubmit(onFormSubmit)}>Submit</button>
            </form>
        </div>
    )
}