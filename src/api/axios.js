import axios from 'axios'
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
})

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("token") || ""
    config.headers.Authorization = token ? `Bearer ${token}` : ""
    return config
})

export default axiosInstance