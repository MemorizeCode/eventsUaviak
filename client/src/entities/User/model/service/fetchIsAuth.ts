import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export interface FetchIsAuthResponse {
    message: string
    accessToken: string
    refreshToken: string
    role: string
}

export const fetchIsAuth = createAsyncThunk<FetchIsAuthResponse, void, { rejectValue: boolean }>("isAuth", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post<FetchIsAuthResponse>(`${import.meta.env.VITE_API_BACKEND}/auth/token`, {
            token: localStorage.getItem('refreshToken')
        })
        if (response.status === 200) {
            return response.data
        }
        return rejectWithValue(false)

    } catch (error) {
        return rejectWithValue(false)
    }
})
