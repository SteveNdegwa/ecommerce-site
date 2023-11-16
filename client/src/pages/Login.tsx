import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../config/api";
import { useDispatch } from "react-redux"
import { login, logout } from "../store";

interface FormData {
  credential: string;
  password: string;
}

export function Login() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  dispatch(logout());
  
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

  function onSubmitForm(data: FormData) {
    setError("");
    api
      .post("/jwt/get-token", data)
      .then((response) => {
        if (response.status === 201) {
          dispatch(login({username: response.data.username}));
          return navigate("/");
        }
        return setError(response.data);
      })
      .catch((err) => setError(`Error occurred: ${err.response?.status}`));
  }

  return (
    <div className="login">
      <form className="loginForm">
        <input placeholder="Username or email..." {...register("credential")} />
        <input type="password" placeholder="Password..." {...register("password")} />
        <p style={{ color: "red" }}>
          {errors.credential?.message || errors.password?.message || error}
        </p>
        <button onClick={handleSubmit(onSubmitForm)}>Login</button>
      </form>
    </div>
  );
}
