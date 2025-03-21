

import { userSliceActions } from '@/entities/User/model/store/userSlice'
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAuthUser:any = createAsyncThunk("authUser",
    async ({login,password}:any, thunkAPI) =>{
        try{
            const response = await axios.post("http://localhost:3000/api/auth/login",{
                login,password
            })
            if(response.status === 200){
                console.log(response)
                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem("refreshToken", response.data.refreshToken)
                thunkAPI.dispatch(userSliceActions.setRole(response.data.role))
                thunkAPI.dispatch(userSliceActions.setAuth(true))
                return thunkAPI.fulfillWithValue(response)
            }
        }
        catch(e:any){
            return thunkAPI.rejectWithValue(e.response?.data?.message)
        }
    }
)