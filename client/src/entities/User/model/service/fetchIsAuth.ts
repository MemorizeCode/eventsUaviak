import $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


export interface FetchIsAuthResponse {
    message: string
    accessToken: string
    refreshToken: string
    role: string
}

export const fetchIsAuth = createAsyncThunk<FetchIsAuthResponse, void, { rejectValue: boolean }>("isAuth", async (_, { rejectWithValue }) => {
    try {
        const response = await $api.post<FetchIsAuthResponse>(`/auth/token`)
        if (response.status === 200) {
            return response.data
        }
        return rejectWithValue(false)

    } catch (error) {
        return rejectWithValue(false)
    }
})
