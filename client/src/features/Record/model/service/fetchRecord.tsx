import { $api } from '@/app/config/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

export const fetchRecord: any = createAsyncThunk("fetchRecord",
    async ({ firstName, lastName, surName, school, classRoom, telephone, idEvent }: any, thunkAPI) => {
        try {
            const nameRegex = /^[a-zA-Zа-яА-Я\s'-]+$/;

            if (!firstName || typeof firstName !== 'string' || !nameRegex.test(firstName.trim())) {
                throw new Error("Имя должно быть заполнено и содержать только буквы.");
            }
            if (!lastName || typeof lastName !== 'string' || !nameRegex.test(lastName.trim())) {
                throw new Error("Фамилия должна быть заполнена и содержать только буквы.");
            }
            if (!surName || typeof surName !== 'string' || !nameRegex.test(surName.trim())) {
                throw new Error("Отчество должно быть заполнено и содержать только буквы.");
            }
            if (!school || typeof school !== 'string' || school.trim() === '') {
                throw new Error("Школа должна быть заполнена.");
            }
            if (!classRoom || typeof classRoom !== 'string' || classRoom.trim() === '') {
                throw new Error("Класс должен быть заполнен.");
            }
            if (!telephone) {
                throw new Error("Телефон должен быть числом.");
            }
            if (!idEvent || typeof idEvent !== 'number') {
                throw new Error("ID события должно быть числом.");
            }

            const response = await $api.post("/record/createInvididualRecord", {
                firstName: firstName,
                lastName: lastName,
                surname: surName,
                school: school,
                class: classRoom,
                telephoneNumber: String(telephone),
                eventsId: idEvent
            })
            if (response.status === 200) {
                message.success(`Вы записались на мероприятие "${response.data}"`)
                return response
            }
            else if (response.status === 403) {
                throw new Error("Запись прекращена. Нет мест")
            }
            else {
                throw new Error("Ошибка сервера")
            }
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.message || e.response?.data?.message || "Неизвестная ошибка")
        }
    }
)