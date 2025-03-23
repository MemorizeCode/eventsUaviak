import { createSlice } from '@reduxjs/toolkit'
import { fetchRecord } from '../service/fetchRecord'


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
    builder.addCase(fetchRecord.fulfilled, () => {
    })
    builder.addCase(fetchRecord.rejected, (state, payload) => {
      state.error = payload.payload?.error as string
    })
  }
})


export const { actions: RecordSliceActions } = recordSlice
export const { reducer: RecordliceReducer } = recordSlice