import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
    // Do something before request is sent
    // interceptors digunakan untuk menambahkan header ke setiap request
    // yang akan dikirim ke server
    // axios.interceptors.request.use() akan menerima dua parameter
    // yaitu fungsi yang akan dijalankan sebelum request dikirim
    // dan fungsi yang akan dijalankan ketika request gagal
    
    config => {
        // config adalah object yang berisi konfigurasi request
        // yang akan dikirim ke server
        // kita bisa menambahkan header ke config ini
        // agar setiap request yang dikirim ke server
        // akan memiliki header Authorization
        // yang berisi token yang disimpan di local storage
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default api