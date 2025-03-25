import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchGetEvents, FetchGetEventsData, FetchGetEventsResponse } from '../service/fetchEventList'


interface EventsState {
    eventList: FetchGetEventsData[]
    page: number
    limit: number,
    isLoading: boolean
    error: string | null
    total: number
}

const initialState: EventsState = {
    eventList: [],
    page: 1,
    limit: 6,
    isLoading: false,
    error: null,
    total: 0
}

export const eventsSlice = createSlice({
    name: "eventsSlice",
    initialState,
    reducers: {
        loadMoreEvents: (state) => {
            state.page = state.page + 1
            // state.limit = state.limit + 6
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetEvents.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchGetEvents.fulfilled, (state, action: PayloadAction<FetchGetEventsResponse>) => {
            state.isLoading = false
            const newEvents = action.payload?.data.filter((event) => !state.eventList.some((e) => e.event.id === event.event.id))
            state.eventList = [...state.eventList, ...newEvents]
            state.total = action.payload.total
        })
        builder.addCase(fetchGetEvents.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message || 'Произошла ошибка при загрузке событий'
        })
    }
})

export const { actions: eventsSliceActions } = eventsSlice
export const { reducer: eventsSliceReducer } = eventsSlice