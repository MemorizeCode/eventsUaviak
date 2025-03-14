import { createSlice } from '@reduxjs/toolkit'
import { fetchGetEvents } from '../service/fetchEventList'

export const eventsSlice = createSlice({
    name:"eventsSlice",
    initialState:{
        eventList: [],
        isLoading:false
    },
    reducers:{
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchGetEvents.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(fetchGetEvents.fulfilled, (state,payload)=>{
            // console.log(payload)
            state.isLoading = false
            state.eventList = payload.payload
        })
        // builder.addCase(fetchGetEvents.reject, (state)=>{
        //     state.isLoading = false
        // })
    }
})

export const { actions: eventsSliceActions} = eventsSlice
export const { reducer: eventsSliceReducer} = eventsSlice