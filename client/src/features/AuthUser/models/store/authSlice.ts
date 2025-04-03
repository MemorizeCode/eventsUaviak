import { createSlice } from '@reduxjs/toolkit'
import { UserAuthSchema } from '../types/UserAuthSchema'
import { fetchAuthUser } from '../service/fetchAuthUser'


const initialState: UserAuthSchema   = {
  login: "",
  password: "",
  error: ""
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchAuthUser.pending, ()=>{
    
    })
    builder.addCase(fetchAuthUser.fulfilled, ()=>{
      
    })
    builder.addCase(fetchAuthUser.rejected, ()=>{
      //ошибка авторизации
    })
  }
})


export const { actions: authSliceActions  } = authSlice
export const { reducer: authSliceReducer  } = authSlice