import axios from 'axios'


const baseURL  = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL,
})
 

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('userToken')
        if (token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
export default axiosInstance