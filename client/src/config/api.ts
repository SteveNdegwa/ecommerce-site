import axios from "axios";
import { useSelector } from "react-redux";
import { store, State, logout } from "../store";

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000"
})

api.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                const username = useSelector((state: State)=> state.user.value.username);
                await axios.post('http://localhost:3000/jwt/refresh-token', {username}, {withCredentials: true});
                return axios(originalRequest);
            } catch (err) {
                store.dispatch(logout()); // access dispatch outside component
                return window.location.replace("http://localhost:5173/login")
            }
        }
        return Promise.reject(error);
    }
)

export default api;