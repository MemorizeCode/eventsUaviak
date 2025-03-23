import { createSlice } from '@reduxjs/toolkit'
import { fetchRecordGr } from '../service/fetchRecord'



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
    builder.addCase(fetchRecordGr.fulfilled, ()=>{
    })
    builder.addCase(fetchRecordGr.rejected, (state, payload)=>{
        state.error = payload.payload?.error as string
    })
  }
})


export const { actions: RecordSliceGrActions  } = recordGrSlice
export const { reducer: RecordliceGrReducer  } = recordGrSlice