import  $api from '@/app/config/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGetEvents:any = createAsyncThunk("fetchGetEvents", async () => {
    try {
        const response = await $api.get("/events/getEvents")
        if(Array.isArray(response.data)){
            return response.data
        }
        return
    } catch (error) {
        console.error('Error fetching events:', error)
        throw error
    }
})