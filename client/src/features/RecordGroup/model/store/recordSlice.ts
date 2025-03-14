import { createSlice } from '@reduxjs/toolkit'
import { fetchRecordGr } from '../service/fetchRecord'
import { message } from 'antd'


export const recordGrSlice = createSlice({
  name: 'counter',
  initialState:{
    isLoading:false,
    error: ""
  },
  reducers: {
    //
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchRecordGr.pending, ()=>{
        // console.log("penging auth")
    })
    builder.addCase(fetchRecordGr.fulfilled, (payload:any)=>{
    //   console.log(action)
        if(payload.payload?.data){
            message.success("Вы записались!")
        }
    })
    builder.addCase(fetchRecordGr.rejected, (state, payload)=>{
        state.error = payload.payload
    })
  }
})


export const { actions: RecordSliceGrActions  } = recordGrSlice
export const { reducer: RecordliceGrReducer  } = recordGrSlice