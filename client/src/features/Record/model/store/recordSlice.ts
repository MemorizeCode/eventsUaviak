import { createSlice } from '@reduxjs/toolkit'
import { fetchRecord } from '../service/fetchRecord'
import { message } from 'antd'


export const recordSlice = createSlice({
  name: 'counter',
  initialState:{
    isLoading:false,
    error: ""
  },
  reducers: {
    //
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchRecord.pending, ()=>{
        // console.log("penging auth")
    })
    builder.addCase(fetchRecord.fulfilled, (payload:any)=>{
    //   console.log(action)
        if(payload.payload?.data){
            message.success("Вы записались!")
        }
    })
    builder.addCase(fetchRecord.rejected, (state, payload)=>{
        state.error = payload.payload
        // message.error(payload.payload)
    })
  }
})


export const { actions: RecordSliceActions  } = recordSlice
export const { reducer: RecordliceReducer  } = recordSlice