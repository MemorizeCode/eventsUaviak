import $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface EditEventData {
    idEvent: number | string;
    titleEvents: string;
    descriptionEvents: string;
    dataEvents: string;
    timesEvents: string;
    durationEvents: number | string;
    cabinetEvents: string;
    peopleCountEvents: number | string;
    whoClassEvents: string;
    idSpecEvent: number | string;
    prepodEvents: string;
}

interface EditEventResponse {
    message: string
}

export interface EditEventError {
    message: string
    status: "error" | "warning" | "success"
}

export const fetchEditEvent = createAsyncThunk<EditEventResponse, EditEventData, { rejectValue: EditEventError }>(
    "adminEditEvent",
    async (form: EditEventData, thunkAPI) => {
        const { idEvent, titleEvents, descriptionEvents, dataEvents, timesEvents, durationEvents, cabinetEvents, peopleCountEvents, whoClassEvents, idSpecEvent, prepodEvents } = form
        try {
            if (!idEvent) {
                return thunkAPI.rejectWithValue({
                    message: "Поле пустое",
                    status: "warning",
                })
            }
            const response = await $api.put<EditEventResponse>(`/events/updateEvent/`, {
                "title": titleEvents,
                "description": descriptionEvents,
                "date": dataEvents,
                "times": timesEvents,
                "duration": durationEvents,
                "cabinet": cabinetEvents,
                "people_count": peopleCountEvents,
                "whoClasses": whoClassEvents,
                "specialityId": idSpecEvent,
                "prepod": prepodEvents,
                "id": idEvent
            })
            if (response?.status === 200) {
                return response?.data
            }
            return thunkAPI.rejectWithValue({
                status: 'error',
                message: response.data.message
            });
        }

        catch (e: unknown) {
            const error = e as { response: { data: EditEventResponse } }
            return thunkAPI.rejectWithValue({
                status: 'error',
                message: error.response.data.message
            })
        }
    })

