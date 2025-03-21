// import { $api } from "@/app/config/api";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { message } from "antd";

// export const fetchAdminDelReviews:any = createAsyncThunk("adminFetch", 
//     async (idReviews:any, thunkAPI) => {
//         if (idReviews !== '') {
//             try{
//                 const response = await $api.delete(`/reviews/deleteReviews?id=${idReviews}`)
//                 console.log(response)
//                 if (response.status === 200) {
//                     message.success("Отзыв удален")
//                     return thunkAPI.fulfillWithValue("Good")
//                 }
//                 if(response.status === 401){
//                     message.error("Отзыв не удален ")
//                     return thunkAPI.rejectWithValue("eerr")
//                 }
//                 if(!response.data){
//                     throw new Error("Ошибка")
//                 }
//             }
//             catch(e:any) {
//                 console.log(e)
//                 // message.error(`Ошибка: ${e}`)
//                 return thunkAPI.rejectWithValue("Error")
//             }
//         }
//         else {
//             message.warning("Поле не может быть пустым")
//         }
//     }
// )

// export const fetchAdminDelEvents: any = createAsyncThunk("adminfsdfdfd", 
//     async (idEvents:any, thunkAPI) =>{
//         if(idEvents !== ""){
//             try{
//                 const response = await $api.delete(`/events/deleteEvent/?id=${idEvents}`)
//                 console.log(response)
//                 if(response.status == 200){
//                     message.success("Мероприятия удалено")
//                     return thunkAPI.fulfillWithValue('good')
//                 }
//                 if(response.status == 401){
//                     message.error("Ошибка удаления")
//                     return thunkAPI.rejectWithValue("error")
//                 }
//                 if(!response.data){
//                     throw new Error()
//                 }
//             }
//             catch(e){
//                 console.log(e)
//                 return thunkAPI.rejectWithValue("Error")
                
//                 // message.error("Приизошла ошибка удаления")
//             }
//         }
//     }
// )

// export const fetchAdminDelSpec:any = createAsyncThunk("adminDelSpec", async (idSpec:any, thunkAPI)=>{
//     try{
//         if(idSpec != ""){
//             const response = await $api.delete(`/spesial/deleteSpesial?id=${idSpec}`)
//             console.log(response)
//             if(!response.data){
//                 throw new Error(`Ошибка ${response?.status || "Неизвестная ошибка"}`);
//             }
//             if(response?.status === 200){
//                 message.success('Успешно удалено')
//                 return thunkAPI.fulfillWithValue("Good")
//             }

//             if(response?.status === 403){
//                 message.error("Ошибка удаления")
//                 return thunkAPI.rejectWithValue("Ошибка удаления")
                
//             }
//         }
//     }
//     catch(e:any){
//         console.log(e)
//         return thunkAPI.rejectWithValue("Error")
//     }
// })


// export const fetchCreateEvents:any = createAsyncThunk("adminCreateEvents", async ({titleEvents,descriptionEvents,dataEvents,timesEvents,durationEvents,cabinetEvents,peopleCountEvents,whoClassEvents,idSpecEvent,prepodEvents}:any, thunkAPI)=>{
//     try{
//             const response = await $api.post("/events/createEvent", {
//                 "title": titleEvents,
//                 "description": descriptionEvents,
//                 "date": dataEvents,
//                 "times": timesEvents,
//                 "duration": durationEvents,
//                 "cabinet": cabinetEvents,
//                 "people_count": peopleCountEvents,
//                 "whoClasses": whoClassEvents,
//                 "specialityId": idSpecEvent,
//                 "prepod": prepodEvents
//             })
//             console.log(response)
//             if(!response.data){
                
//                 throw new Error(`Ошибка ${response?.status}`);
//             }
//             if(response?.status === 200){
//                 message.success('Мероприятие создано')
//                 return thunkAPI.fulfillWithValue("Good")
//             }
//             else{
//                 message.error(response?.data?.message || 'Ошибка')
//                 return thunkAPI.rejectWithValue("Error")
//             }
//             // if(response?.status === 403){
//             //     message.error("Ошибка")
//             //     return thunkAPI.rejectWithValue("Ошибка удаления")
                
//             // }
//     }
//     catch(e:any){
//         console.log(e)
//         return thunkAPI.rejectWithValue("Error")
//     }
// })

