import $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface CreateEventData {
    titleEvents: string;
    descriptionEvents: string;
    dataEvents: string;
    timesEvents: string;
    durationEvents: number;
    cabinetEvents: string;
    peopleCountEvents: number;
    whoClassEvents: string;
    idSpecEvent: number;
    prepodEvents: string;
}

export interface ValidationError {
    message: string;
    field?: string;
}

export interface CreateEventResponse {
    message: string
}

export interface CreateEventError {
    status: "error" | "warning" | "success"
    errors?: ValidationError[]
    message?: string
}


export const fetchCreateEvents = createAsyncThunk<CreateEventResponse, CreateEventData, {rejectValue: CreateEventError}>(
    "adminCreateEvents",
    async (data: CreateEventData, thunkAPI) => {
        try {
            const validationErrors: ValidationError[] = [];

            if (!data.titleEvents?.trim()) {
                validationErrors.push({ message: 'Название мероприятия обязательно', field: 'titleEvents' });
            }
            if (!data.descriptionEvents?.trim()) {
                validationErrors.push({ message: 'Описание мероприятия обязательно', field: 'descriptionEvents' });
            }
            if (!data.dataEvents) {
                validationErrors.push({ message: 'Дата мероприятия обязательна', field: 'dataEvents' });
            }
            if (!data.timesEvents) {
                validationErrors.push({ message: 'Время мероприятия обязательно', field: 'timesEvents' });
            }
            if (!data.durationEvents || data.durationEvents <= 0) {
                validationErrors.push({ message: 'Длительность мероприятия должна быть больше 0', field: 'durationEvents' });
            }
            if (!data.cabinetEvents?.trim()) {
                validationErrors.push({ message: 'Кабинет обязателен', field: 'cabinetEvents' });
            }
            if (!data.peopleCountEvents || data.peopleCountEvents <= 0) {
                validationErrors.push({ message: 'Количество участников должно быть больше 0', field: 'peopleCountEvents' });
            }
            if (!data.whoClassEvents?.trim()) {
                validationErrors.push({ message: 'Укажите для какого класса мероприятие', field: 'whoClassEvents' });
            }
            if (!data.idSpecEvent) {
                validationErrors.push({ message: 'Выберите специальность', field: 'idSpecEvent' });
            }
            if (!data.prepodEvents?.trim()) {
                validationErrors.push({ message: 'Укажите преподавателя', field: 'prepodEvents' });
            }

            if (validationErrors.length > 0) {
                return thunkAPI.rejectWithValue({
                    status: 'warning',
                    errors: validationErrors
                });
            }

            const response = await $api.post<CreateEventResponse>("/events/createEvent", {
                title: data.titleEvents,
                description: data.descriptionEvents,
                date: data.dataEvents,
                times: data.timesEvents,
                duration: data.durationEvents,
                cabinet: data.cabinetEvents,
                people_count: data.peopleCountEvents,
                whoClasses: data.whoClassEvents,
                specialityId: data.idSpecEvent,
                prepod: data.prepodEvents
            });

            if (response?.status === 200) {
                return response.data
            }

            return thunkAPI.rejectWithValue({
                status: 'error',
                message: response.data.message
            });
        }
        catch (e: unknown) {
            const error = e as { response: { data: CreateEventResponse } }
            return thunkAPI.rejectWithValue({
                status: 'error',
                message: error.response.data.message
            })
        }
    }
);