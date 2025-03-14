import { $api } from '@/app/config/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

export const fetchRecordGr: any = createAsyncThunk(
  "fetchRecordGr",
  async (
    { firstNameAttendant, lastNameAttendant, surnameAttendant, school, classSchool, countPeople, fileList, idEvent, tel }: any,
    thunkAPI
  ) => {
    try {
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

      const formData = new FormData();
      formData.append('firstNameAttendant', firstNameAttendant);
      formData.append('lastNameAttendant', lastNameAttendant);
      formData.append('surnameAttendant', surnameAttendant);
      formData.append('school', school);
      formData.append('classSchool', classSchool);
      formData.append('countPeople', countPeople.toString());
      formData.append('idEvent', idEvent.toString());
      formData.append('tel', tel);
      formData.append('file', fileList[0].originFileObj); 

      // Отправляем данные на сервер
      const response = await $api.post("/record/createGroupRecord", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.status === 200) {
        message.success("Вы записались!");
        return thunkAPI.fulfillWithValue("good");
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