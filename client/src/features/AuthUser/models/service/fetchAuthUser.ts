

import $api from '@/app/config/api'
import { userSliceActions } from '@/entities/User/model/store/userSlice'
import {createAsyncThunk} from '@reduxjs/toolkit'

interface AuthUserResponse {
    message: string
    accessToken: string
    refreshToken: string
    role: string
}
export interface AuthUserError {
    message: string
    error: string
}

interface AuthUserParams {
    login: string
    password: string
}

export const fetchAuthUser = createAsyncThunk<AuthUserResponse, AuthUserParams, { rejectValue: AuthUserError }>("authUser",
    async ({login,password}:AuthUserParams, thunkAPI) =>{
        try{
            if(login.length < 6 || password.length < 6){
                return thunkAPI.rejectWithValue({
                    message: "Логин и пароль должны быть больше 6 символов",
                    error: 'error'
                })
            }
            const response = await $api.post<AuthUserResponse>("/auth/login",{
                login,password
            })
            if(response.status === 200){
                console.log(response)
                localStorage.setItem("accessToken", response.data.accessToken)
                // localStorage.setItem("refreshToken", response.data.refreshToken)
                thunkAPI.dispatch(userSliceActions.setRole(response.data.role))
                thunkAPI.dispatch(userSliceActions.setAuth(true))
                return thunkAPI.fulfillWithValue(response.data)
            }
            return thunkAPI.rejectWithValue({
                message: response.data.message,
                error: 'error'
            })
        }
        catch(e){
            const payload = e as {response: {data: AuthUserError}}
            return thunkAPI.rejectWithValue({
                message: payload.response.data.message,
                error: 'error'
            })
        }
    }
)