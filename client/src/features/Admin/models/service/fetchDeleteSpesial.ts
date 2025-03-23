import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "@/app/config/api";



interface DeleteSpesialResponse{
    message: string
}

export interface DeleteSpesialError{
    message: string
    error: string
}

export const fetchDeleteSpesial = createAsyncThunk<DeleteSpesialResponse, string | number | null, { rejectValue: DeleteSpesialError }>("admin/fetchDeleteSpesial", async (id: string | number | null, thunkAPI) => {
    try{
        if(!id){
            return thunkAPI.rejectWithValue({
                message: "ID специальности не может быть пустым",
                error: 'warning'
            })
        }
        const response = await $api.delete<DeleteSpesialResponse>(`/spesial/deleteSpecial?id=${id}`)
        if(response.status === 200){
            return response.data
        }
        return thunkAPI.rejectWithValue({
            message: response.data.message,
            error: 'error'
        })
    }
    catch(error){
        const errorPayload = error as { response: { data: DeleteSpesialError } }
        return thunkAPI.rejectWithValue({
            message: errorPayload.response.data.message,
            error: 'error'
        })
    }
})
