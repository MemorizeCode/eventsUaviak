import  $api  from '@/app/config/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export interface RecordError {
    message: string
    error: string
}

interface RecordResponse {
    message: string
    // error: string
}

interface RecordParams {
    firstName: string
    lastName: string
    surName: string
    school: string
    classRoom: string
    telephone: string
    idEvent: number | null
}


export const fetchRecord = createAsyncThunk<RecordResponse, RecordParams, { rejectValue: RecordError }>("fetchRecord",
    async ({ firstName, lastName, surName, school, classRoom, telephone, idEvent }: RecordParams, thunkAPI) => {
        try {
            const nameRegex = /^[a-zA-Zа-яА-Я\s'-]+$/;

            if (!firstName || typeof firstName !== 'string' || !nameRegex.test(firstName.trim())) {
                return thunkAPI.rejectWithValue({ message: "Имя должно быть заполнено и содержать только буквы.", error: "warning"})
            }
            if (!lastName || typeof lastName !== 'string' || !nameRegex.test(lastName.trim())) {
                return thunkAPI.rejectWithValue({ message: "Фамилия должна быть заполнена и содержать только буквы.", error: "warning"})
            }
            if (!surName || typeof surName !== 'string' || !nameRegex.test(surName.trim())) {
                return thunkAPI.rejectWithValue({ message: "Отчество должно быть заполнено и содержать только буквы.", error: "warning"})
            }
            if (!school || typeof school !== 'string' || school.trim() === '') {
                return thunkAPI.rejectWithValue({ message: "Школа должна быть заполнена.", error: "warning"})
            }
            if (!classRoom || typeof classRoom !== 'string' || classRoom.trim() === '') {
                return thunkAPI.rejectWithValue({ message: "Класс должен быть заполнен.", error: "warning"})
            }
            if (telephone) {
                const phoneValid = /^[0-9]+$/;
                if(!phoneValid.test(telephone) || telephone.length != 11){
                  return thunkAPI.rejectWithValue({ message: "Неверный номер телефона", error: "warning"})
                }
              }
            if (!idEvent || typeof idEvent !== 'number') {
                return thunkAPI.rejectWithValue({ message: "ID события должно быть числом.", error: "warning"})
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
                return response.data
            }
            return thunkAPI.rejectWithValue({
                message: response.data.message,
                error: response.data.error
            })
        }
        catch (e) {
            const error = e as {response: {data: RecordError}}
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)