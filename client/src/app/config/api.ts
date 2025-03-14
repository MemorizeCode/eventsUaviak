import axios from "axios";
// alert(import.meta.env.VITE_API_BACKEND)
export const $api = axios.create({
    baseURL:import.meta.env.VITE_API_BACKEND,
    headers:{
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = "Bearer " + localStorage.getItem('accessToken');
    return config
})

$api.interceptors.response.use((config)=>{
    return config
}, async (err)=>{
    const originalReq = err.config
    if(err.response.status === 401 && err.config && !err.config._isRetry){
        originalReq._isRetry = true
        try{
            const response = await axios.post("http://localhost:5000/api/auth/token", {
                token: localStorage.getItem("refreshToken")
            })
            if(response.status === 200){
                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem("refreshToken", response.data.refreshToken)
            }
            else{
                //
                console.log("ne good")
            }
            return $api.request(originalReq)
        }
        catch(e){
            console.log("config")
        }
    }
    return err.response
})