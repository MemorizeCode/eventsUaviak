import  $api  from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


export interface FetchGetRecordsResponse {
    data: FetchGetRecordsData[]
    message: string
}

export interface FetchGetRecordsError {
    status: "error" | "warning" | "success"
    message?: string
}

export interface FetchGetRecordsData {
    id: number
    name: string
    phone: string
    school: string
    countPeople: number
    eventsTitle: string
    listPeople: string
    eventsDate: string
    recordDate: string
    type: string
}

export const fetchGetRecords = createAsyncThunk<FetchGetRecordsResponse, void, {rejectValue: FetchGetRecordsError} >("fetchGetRecords", async (_, thunkAPI)=>{
    try {
        const response = await $api.get<FetchGetRecordsResponse>("/record/getRecords")
        if(response?.status === 200){
            return response.data
        }
        return thunkAPI.rejectWithValue({
            status: "error",
            message: "Ошибка при получении записей"
        })
    
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue({
            status: "error",
            message: "Ошибка при получении записей"
        })
    }
})
