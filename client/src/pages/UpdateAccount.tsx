import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormData } from "./CreateAccount";
import * as yup from "yup";
import api from "../config/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export interface UserData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}


export function UpdateAccount() {
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState<UserData | null>(null);

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(4, "Username must be 4 characters or more")
      .required("Please enter your username"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(7, "Weak password")
      .required("Please enter your password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords don't match")
      .required("Please confirm your password"),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const username = localStorage.getItem("username");

    api
      .get(`/users/${username}`)
      .then((response) => {
        const { username, email, password, role } = response.data[0];
        setUserDetails({
          username: username,
          email: email,
          password: password,
          confirmPassword: password,
          role: role
        });

        reset({
          username: username,
          email: email,
          password: password,
          confirmPassword: password,
        });
      })
      .catch((error) => setError(`Error occurred: ${error.response?.status}`));
  }, [reset]);

  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    setError("");
    if (
      data.username === userDetails?.username &&
      data.email === userDetails?.email &&
      data.password === userDetails?.password
    )
      return setError("No changes made");
    await api
      .put("/users", {...data, role: userDetails?.role})
      .then((response) => {
        if (response.status === 201) return navigate("/login");
        return setError(response.data);
      })
      .catch((error) => {
        return setError(`Error occurred: ${error.response?.status}`);
      });
  }

  return (
    <div className="updateAccount">
      <form>
        <input type="text" {...register("username")} />
        <input type="text" {...register("email")} />
        <input type="password" {...register("password")} />
        <input type="password" {...register("confirmPassword")} />
        <p>
          {errors.username?.message ||
            errors.email?.message ||
            errors.password?.message ||
            errors.confirmPassword?.message ||
            error}
        </p>
        <button onClick={handleSubmit(onSubmit)}>Update</button>
      </form>
    </div>
  );
}
