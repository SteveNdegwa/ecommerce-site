import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface FormData {
  credential: string;
  password: string;
}

export function Login() {
  const [error, setError] = useState("")

  const navigate = useNavigate();

  const schema = yup.object().shape({
    credential: yup.string().required("Please enter your username or email"),
    password: yup.string().required("Please enter your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmitForm(data: FormData) {
    setError("");
    await axios
      .post("http://localhost:3000/login", data)
      .then((response) => {
        if (response.data === "authenticated") {
          return navigate("/");
        }
        setError(response.data)
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login">
      <form className="loginForm">
        <input placeholder="Username or email..." {...register("credential")} />
        <input placeholder="Password..." {...register("password")} />
        <p style={{ color: "red" }}>
          {errors.credential?.message || errors.password?.message || error}
        </p>
        <button onClick={handleSubmit(onSubmitForm)}>Login</button>
      </form>
    </div>
  );
}
