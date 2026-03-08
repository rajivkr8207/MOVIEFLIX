import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});


api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("token");

        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
    },
    (error) => Promise.reject(error)
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response.data);
        }

        return Promise.reject(error);
    }
);
export default api;