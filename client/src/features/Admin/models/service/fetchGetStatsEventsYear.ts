import $api from "@/app/config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

interface FetchGetStatsEventsYearProps {
    yearStats: number | string
}

export interface FetchGetStatsEventsYearResponse {
    data: number
}

export interface FetchGetStatsEventsYearError {
    message: string
    status: 'error' | 'warning'
}

export const fetchGetStatsEventsYear = createAsyncThunk<FetchGetStatsEventsYearResponse, FetchGetStatsEventsYearProps, { rejectValue: FetchGetStatsEventsYearError }>('statsEvent/fetchGetStatsEventsYear',
    async (data: FetchGetStatsEventsYearProps, thunkAPI) => {
        try {
            const { yearStats } = data
            if (!yearStats) {
                return thunkAPI.rejectWithValue({
                    message: 'Год не указан',
                    status: 'error'
                })
            }
            const response = await $api.get<FetchGetStatsEventsYearResponse>(`/otchet/getPeopleYear/?year=${yearStats}`)
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
