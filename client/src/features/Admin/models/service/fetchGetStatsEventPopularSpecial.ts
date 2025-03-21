import $api from "@/app/config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

interface FetchGetStatsEventPopularSpecialResponse {
    message: string
    data: DataSpecialty
}

interface DataSpecialty {
    title: string
    totalRegistrations: number
    eventsCount: number
}

interface FetchGetStatsEventPopularSpecialError {
    message: string
    error: string
}


export const fetchGetStatsEventPopularSpecial = createAsyncThunk<FetchGetStatsEventPopularSpecialResponse, void, { rejectValue: FetchGetStatsEventPopularSpecialError }>('statsEvent/fetchGetStatsEventPopularSpecial',
    async (_, thunkAPI) => {
        try {
            const response = await $api.get<FetchGetStatsEventPopularSpecialResponse>(`/otchet/spesialVostrebovanie`)
            if (response.status === 200) {
                return response.data
            }
            return thunkAPI.rejectWithValue({
                message: response.data.message,
                error: 'error'
            })

        }
        catch (error: unknown) {
            const errorPayload = error as FetchGetStatsEventPopularSpecialError
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                error: 'error'
            })
        }
    }
)
