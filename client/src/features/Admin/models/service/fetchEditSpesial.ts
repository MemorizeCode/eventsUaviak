import $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface EditSpesialResponse {
    message: string
}

interface EditSpesialDTO {
    id: number | null
    title: string
}

export interface EditSpesialError {
    message: string,
    error: string
}


export const fetchEditSpesial = createAsyncThunk<EditSpesialResponse, EditSpesialDTO, {rejectValue: EditSpesialError}>(
    "editSpesial",
     async (body:EditSpesialDTO, thunkAPI) => {
        try{
            if(!body.id || !body.title){
                return thunkAPI.rejectWithValue({
                    message: 'Необходимо заполнить все поля',
                    error: 'warning'
                })
            }
            const response = await $api.put<EditSpesialResponse>(`/spesial/updateSpecial`, {
                id: Number(body.id),
                title: body.title
            })
            if(response.status === 200){
                return response.data
            }
            return thunkAPI.rejectWithValue({
                message: response.data.message,
                error: 'error'
            })
        }
        catch(e){
            const error = e as {response: {data: EditSpesialError}}
            return thunkAPI.rejectWithValue({
                message: error.response.data.message,
                error: 'error'
            })
        }
})
