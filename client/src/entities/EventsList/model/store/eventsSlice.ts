import { createSlice } from '@reduxjs/toolkit'
import { fetchGetEvents } from '../service/fetchEventList'

export const eventsSlice = createSlice({
    name:"eventsSlice",
    initialState:{
        eventList: [],
        isLoading: false,
        error: null
    },
    reducers:{
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchGetEvents.pending, (state)=>{
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchGetEvents.fulfilled, (state, action)=>{
            state.isLoading = false
            state.eventList = action.payload
        })
        builder.addCase(fetchGetEvents.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.error.message
            console.error('Failed to fetch events:', action.error)
        })
    }
})

export const { actions: eventsSliceActions} = eventsSlice
export const { reducer: eventsSliceReducer} = eventsSlice