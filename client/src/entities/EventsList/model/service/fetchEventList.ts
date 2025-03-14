import { $api } from '@/app/config/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGetEvents:any = createAsyncThunk("fetchGetEvents", async () => {
    const response = await $api.get("/events/getEvents")
    if(response.data){
        return response.data
    }
})