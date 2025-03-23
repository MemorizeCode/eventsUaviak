import $api from "@/app/config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

interface NewSpesialResponse {
    message: string
}

export interface NewSpesialError {
    message: string
    error: string
}

export const fetchNewSpesial = createAsyncThunk<NewSpesialResponse, string, { rejectValue: NewSpesialError }>("admin/fetchNewSpesial", async (title: string, thunkAPI) => {
    try {
        if (!title) {
            return thunkAPI.rejectWithValue({ message: "Название специальности не может быть пустым", error: 'warning' })
        }
        const response = await $api.post<NewSpesialResponse>("/spesial/newSpecial", { title })
        if (response.status === 200) {
            return response.data
        }
        return thunkAPI.rejectWithValue({ message: response.data.message, error: 'error' })
    }
    catch (error) {
        const errorPayload = error as { response: { data: NewSpesialError } }
        return thunkAPI.rejectWithValue({
            message: errorPayload.response.data.message,
            error: 'error'
        })
    }

})
