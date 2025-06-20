import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
})

export default axiosInstance