import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000"
})

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if(token){
        config.headers.Authorization = `Bearer ${token}`;
      }      
      return config;
   },
   (error)=> Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const username = localStorage.getItem("username");
                const response = await axios.post('http://localhost:3000/jwt/refresh-token', {refreshToken, username});
                console.log(response);
                
                const { token } = response.data;
                localStorage.setItem("token", token);

                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (err) {
                return window.location.replace("http://localhost:5173/login")
            }
        }
        return Promise.reject(error);
    }
)

export default api;