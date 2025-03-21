import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchIsAuth:any = createAsyncThunk("isAuth", async ()=>{
    const response = await axios.post(`${import.meta.env.VITE_API_BACKEND}/auth/token`,{
        token: localStorage.getItem('refreshToken')
    })
    if(response.data){
        return response.data
    }
    return false
})