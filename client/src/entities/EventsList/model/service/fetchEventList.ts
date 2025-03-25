import  $api from '@/app/config/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { EventSchema } from '../types/EventsListSchema'

// export interface EventSchema {
//     id: number
//     title: string
//     description: string
//     date: string
//     times: string
// }

interface FetchGetEventsParams {
    limit?: number
    page?: number
}
export interface FetchGetEventsResponse {
    data: FetchGetEventsData[]
    message: string,
    total: number
}

export interface FetchGetEventsData {
    event: EventSchema
    ostalosMest: number
}

export interface FetchGetEventsError {
    status: "error" | "warning" | "success"
    message?: string
}

export const fetchGetEvents = createAsyncThunk<FetchGetEventsResponse, FetchGetEventsParams, {rejectValue: FetchGetEventsError} >("fetchGetEvents", async ({limit = 6, page = 1}: FetchGetEventsParams, thunkAPI) => {
    try {
        const response = await $api.get<FetchGetEventsResponse>(`/events/getEvents?limit=${limit}&page=${page}`)
        if(response.status === 200){
            return response.data
        }
        
        return thunkAPI.rejectWithValue({
            status: 'error',
            message: response.data.message
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка'
        return thunkAPI.rejectWithValue({
            status: 'error',
            message: errorMessage
        })
    }
})