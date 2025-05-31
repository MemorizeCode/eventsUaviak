
import $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface DeleteEventData {
    idEvent: number | string
}

export interface DeleteEventResponse {
    message: string;
}


export interface DeleteEventError {
    message: string;
    status: "error" | "warning";
}

export const fetchDeleteEvent = createAsyncThunk<DeleteEventResponse, DeleteEventData, {rejectValue: DeleteEventError}>("adminDeleteEvent",
    async (data: DeleteEventData, thunkAPI) => {
        try {
            const idEvent = data.idEvent
            if(!idEvent){
                return thunkAPI.rejectWithValue({
                    message: "Поле пустое",
                    status: "warning",
                });
            }
            if (!Number(idEvent)) {
                return thunkAPI.rejectWithValue({
                    message: "Поле должно быть числом",
                    status: "warning",
                });
            }
            const response = await $api.delete<DeleteEventResponse>(`/events/deleteEvent/?id=${data.idEvent}`)
            if (response?.status === 200) {
                return response?.data
            }
            return thunkAPI.rejectWithValue({
                message: response?.data.message,
                status: "error",
            });
        }
        catch (e: unknown) {
            const error = e as { response: { data: DeleteEventResponse } }
            return thunkAPI.rejectWithValue({
                status: 'error',
                message: error.response.data.message
            });
        }
    })
