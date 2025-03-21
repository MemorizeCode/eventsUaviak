import $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchGetStatsEventMountProps {
    year: number,
    month: number
}

export interface FetchGetStatsEventMountResponse {
    data: number
}

export interface FetchGetStatsEventMountError {
    message: string
    status: 'error' | 'warning'
}   

export const fetchGetStatsEventMount = createAsyncThunk<FetchGetStatsEventMountResponse, FetchGetStatsEventMountProps, { rejectValue: FetchGetStatsEventMountError }>('statsEvent/fetchGetStatsEventMount', 
    async (data, thunkAPI) => {
        try {
            const {year, month} = data
            if (!year || !month) {
                return thunkAPI.rejectWithValue({
                    message: 'Год или месяц не указаны',
                    status: 'error'
                })
            }
            const response = await $api.get<FetchGetStatsEventMountResponse>(`/otchet/getPeopleMouth?mouth=${month}&year=${year}`)
            if (response.status === 200) {
                return response.data
            }
            return thunkAPI.rejectWithValue({
                message: 'Ошибка при получении данных',
                status: 'error'
            })
        }
        catch(e){
            const error = e as FetchGetStatsEventMountError
            return thunkAPI.rejectWithValue({
                message: error.message,
                status: error.status
            })
        }
    }
)
