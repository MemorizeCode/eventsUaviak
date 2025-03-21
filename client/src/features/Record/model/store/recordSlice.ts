import { createSlice } from '@reduxjs/toolkit'
import { fetchRecord } from '../service/fetchRecord'
import { message } from 'antd'


export const recordSlice = createSlice({
  name: 'counter',
  initialState: {
    isLoading: false,
    error: ""
  },
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecord.pending, () => {
    })
    builder.addCase(fetchRecord.fulfilled, (payload) => {
    })
    builder.addCase(fetchRecord.rejected, (state, payload) => {
      state.error = payload.payload
    })
  }
})


export const { actions: RecordSliceActions } = recordSlice
export const { reducer: RecordliceReducer } = recordSlice