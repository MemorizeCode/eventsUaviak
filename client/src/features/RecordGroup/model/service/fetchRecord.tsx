import $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UploadFile } from "antd/es/upload";



export interface RecordGroupError {
  message: string
  error: string
}

export interface RecordGroupResponse {
  message: string
}

export interface RecordGroupParams {
  formData: RecordGroupFormData
  fileList: UploadFile[]
  idEvent: number | null
}

interface RecordGroupFormData {
  firstNameAttendant: string
  lastNameAttendant: string
  surnameAttendant: string
  school: string
  classSchool: string
  countPeople: number | null
  tel: string
}

export const fetchRecordGr = createAsyncThunk<RecordGroupResponse, RecordGroupParams, { rejectValue: RecordGroupError }>("fetchRecordGr",
  async (
    { formData, fileList, idEvent }: RecordGroupParams,
    thunkAPI
  ) => {
    try {
      const { firstNameAttendant, lastNameAttendant, surnameAttendant, school, classSchool, countPeople, tel } = formData;

      const nameRegex = /^[a-zA-Zа-яА-Я\s'-]+$/;

      if (!firstNameAttendant || typeof firstNameAttendant !== 'string' || !nameRegex.test(firstNameAttendant.trim())) {
        return thunkAPI.rejectWithValue({ message: "Имя сопровождающего должно быть заполнено и содержать только буквы.", error: "warning" })
      }
      if (!lastNameAttendant || typeof lastNameAttendant !== 'string' || !nameRegex.test(lastNameAttendant.trim())) {
        return thunkAPI.rejectWithValue({ message: "Фамилия сопровождающего должна быть заполнена и содержать только буквы.", error: "warning" })
      }
      if (!surnameAttendant || typeof surnameAttendant !== 'string' || !nameRegex.test(surnameAttendant.trim())) {
        return thunkAPI.rejectWithValue({ message: "Отчество сопровождающего должно быть заполнено и содержать только буквы.", error: "warning" })
      }
      if (!school || typeof school !== 'string' || school.trim() === '') {
        return thunkAPI.rejectWithValue({ message: "Школа должна быть заполнена.", error: "warning" })
      }
      if (!classSchool || typeof classSchool !== 'string' || classSchool.trim() === '') {
        return thunkAPI.rejectWithValue({ message: "Класс должен быть заполнен.", error: "warning" })
      }
      if (!countPeople || typeof countPeople !== 'number') {
        return thunkAPI.rejectWithValue({ message: "Количество людей должно быть числом.", error: "warning" })
      }
      if (!idEvent || typeof idEvent !== 'number') {
        return thunkAPI.rejectWithValue({ message: "ID события должно быть числом.", error: "warning" })
      }
      if (tel) {
        const phoneValid = /^[0-9]+$/;
        if(!phoneValid.test(tel) || tel.length < 11){
          return thunkAPI.rejectWithValue({ message: "Неверный номер телефона", error: "warning"})

        }
      }

      if (!fileList || !Array.isArray(fileList) || fileList.length === 0 || !fileList[0]?.originFileObj) {
        return thunkAPI.rejectWithValue({ message: "Необходимо загрузить файл списка.", error: "warning" })
      }

      // Валидация файла
      const allowedExtensions = ['.doc', '.docx'];
      const allowedMimeTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      const file = fileList[0].originFileObj;
      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.slice(fileName.lastIndexOf('.'));
      const fileMimeType = file.type;

      // Проверка расширения файла
      if (!allowedExtensions.includes(fileExtension)) {
        return thunkAPI.rejectWithValue({ message: "Файл должен быть в формате .doc или .docx.", error: "warning" });
      }
      // Проверка MIME-типа файла
      if (!allowedMimeTypes.includes(fileMimeType)) {
        return thunkAPI.rejectWithValue({ message: "Недопустимый тип файла. Разрешены только документы Word.", error: "warning" });
      }


      const formDataToSend = new FormData();
      formDataToSend.append('firstNameAttendant', firstNameAttendant);
      formDataToSend.append('lastNameAttendant', lastNameAttendant);
      formDataToSend.append('surnameAttendant', surnameAttendant);
      formDataToSend.append('school', school);
      formDataToSend.append('class', classSchool);
      formDataToSend.append('countPeople', countPeople.toString());
      formDataToSend.append('eventsId', idEvent.toString());
      formDataToSend.append('phone', tel);
      formDataToSend.append('fileList', fileList[0].originFileObj);

      const response = await $api.post<RecordGroupResponse>("/record/createGroupRecord", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
      }
      return thunkAPI.rejectWithValue({
        message: response.data.message,
        error: 'error'
      })
    } catch (e) {
      const error = e as { response: { data: RecordGroupError } }
      return thunkAPI.rejectWithValue(
        {
          message: error.response.data.message,
          error: 'error'
        }
      );
    }
  }
);