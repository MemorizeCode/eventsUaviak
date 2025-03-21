import  $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UploadFile } from "antd";

export const fetchRecordGr: any = createAsyncThunk(
  "fetchRecordGr",
  async (
    { formData, fileList, idEvent }: { formData: any; fileList: UploadFile[]; idEvent: number },
    thunkAPI
  ) => {
    try {
      const { firstNameAttendant, lastNameAttendant, surnameAttendant, school, classSchool, countPeople, tel } = formData;

      const nameRegex = /^[a-zA-Zа-яА-Я\s'-]+$/;

      if (!firstNameAttendant || typeof firstNameAttendant !== 'string' || !nameRegex.test(firstNameAttendant.trim())) {
        throw new Error("Имя сопровождающего должно быть заполнено и содержать только буквы.");
      }
      if (!lastNameAttendant || typeof lastNameAttendant !== 'string' || !nameRegex.test(lastNameAttendant.trim())) {
        throw new Error("Фамилия сопровождающего должна быть заполнена и содержать только буквы.");
      }
      if (!surnameAttendant || typeof surnameAttendant !== 'string' || !nameRegex.test(surnameAttendant.trim())) {
        throw new Error("Отчество сопровождающего должно быть заполнено и содержать только буквы.");
      }
      if (!school || typeof school !== 'string' || school.trim() === '') {
        throw new Error("Школа должна быть заполнена.");
      }
      if (!classSchool || typeof classSchool !== 'string' || classSchool.trim() === '') {
        throw new Error("Класс должен быть заполнен.");
      }
      if (!countPeople || typeof countPeople !== 'number') {
        throw new Error("Количество людей должно быть числом.");
      }
      if (!idEvent || typeof idEvent !== 'number') {
        throw new Error("ID события должно быть числом.");
      }
      if (!tel) {
        throw new Error("Нету телефона");
      }
      if (!fileList || !Array.isArray(fileList) || fileList.length === 0 || !fileList[0]?.originFileObj) {
        throw new Error("Необходимо загрузить файл списка.");
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

      const response = await $api.post("/record/createGroupRecord", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue("Вы записались");
      } else if (response.status === 403) {
        throw new Error("Запись прекращена");
      } else {
        throw new Error("Произошла ошибка при отправке данных.");
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message || e.response?.data?.message || "Неизвестная ошибка");
    }
  }
);