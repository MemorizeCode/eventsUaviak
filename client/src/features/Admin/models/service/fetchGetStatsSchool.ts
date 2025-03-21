import $api from "@/app/config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

export interface FetchGetStatsEventsYearResponse {
    data: School[],
    message: string
}

export interface School {
    id: number,
    school:string
}

export interface FetchGetStatsEventsYearError {
    message: string
    status: 'error' | 'warning'
}

export const fetchGetStatsSchool = createAsyncThunk<FetchGetStatsEventsYearResponse, void, { rejectValue: FetchGetStatsEventsYearError }>('statsEvent/fetchGetStatsSchool',
    async (_, thunkAPI) => {
        try {
            const response = await $api.get<FetchGetStatsEventsYearResponse>(`/otchet/school`)
            if (response.status === 200) {
                return response.data
            }
            return thunkAPI.rejectWithValue({
                message: 'Ошибка при получении данных',
                status: 'error'
            })
        }
        catch (e) {
            const error = e as FetchGetStatsEventsYearError
            return thunkAPI.rejectWithValue({
                message: error.message,
                status: error.status
            })
        }
    })
