import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchIsAuth:any = createAsyncThunk("isAuth", async ()=>{
    const response = await axios.post('http://localhost:5000/api/auth/token',{
        token: localStorage.getItem('refreshToken')
    })
    if(response.data){
        return response.data
    }
    return false
})