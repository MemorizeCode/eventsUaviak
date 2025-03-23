import $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


export interface ReturnSpecialData {
    message: string
    data: Spesial[]
}

export interface Spesial {
    id: number
    title: string
}   

export const fetchAllSpecial = createAsyncThunk<ReturnSpecialData, void, { rejectValue: string }>("fetchAllSpecial",
     async (_, thunkAPI) => {
    try {
        const response = await $api.get<ReturnSpecialData>("/spesial/getSpesial")
        return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error as string)
    }
})
