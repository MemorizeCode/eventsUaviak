import  $api  from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetRecords:any = createAsyncThunk("fetchGetRecords", async (_, thunkAPI)=>{
    try {
        const response = await $api.get("/record/getRecords")
        if(response?.status === 200){
            return thunkAPI.fulfillWithValue(response.data)
        }
        return thunkAPI.rejectWithValue(response.data)
    
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error)
    }
})
