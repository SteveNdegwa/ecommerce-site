import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  credential: string;
  password: string;
}

export function Login() {
   
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
    await axios
      .post("http://localhost:3000/login", {
        credential: data.credential,
        password: data.password,
      })
      .then((response) => {
        if(response.data === "success"){
            navigate("/");
        }
      })
      .catch((err)=> console.log(err));
  }

  return (
    <div className="login">
      <form className="loginForm">
        <input placeholder="Username or email..." {...register("credential")} />
        <input placeholder="Password..." {...register("password")} />
        <p style={{ color: "red" }}>
          {errors.credential? errors.credential.message : errors.password?.message}
        </p>
        <button onClick={handleSubmit(onSubmitForm)}>Login</button>
      </form>
    </div>
  );
}
