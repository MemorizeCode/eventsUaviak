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
        console.log("penging auth")
    })
    builder.addCase(fetchAuthUser.fulfilled, (action)=>{
        console.log('fulfilled auth')
    })
    builder.addCase(fetchAuthUser.rejected, ( payload)=>{
      console.log('rejected auth')
    })
  }
})


export const { actions: authSliceActions  } = authSlice
export const { reducer: authSliceReducer  } = authSlice