import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAllSpecial } from '../service/fetchAllSpecial'
import { fetchGetRecords, FetchGetRecordsData, FetchGetRecordsResponse } from '../service/fetchGetRecords'
import { fetchCreateEvents } from '../service/fetchCreateEvent'
import { fetchDeleteEvent } from '../service/fetchDeleteEvent'
import { FetchAllSpecialSchema } from '../types/fetchAllSpecail'
import { fetchGetStatsEventsYear } from '../service/fetchGetStatsEventsYear'
import { fetchGetStatsEventMount } from '../service/fetchGetStatsEventsMount'
import { fetchGetStatsSchool } from '../service/fetchGetStatsSchool'
import { fetchGetStatsEventPopularSpecial } from '../service/fetchGetStatsEventPopularSpecial'


const initialState: FetchAllSpecialSchema   = {
    isLoading: false,
    error: "",
    allSpecial: []
}

export const allSpecialSlice = createSlice({
  name: 'allSpecial',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchAllSpecial.pending, (state)=>{
      state.isLoading = true
    }),
    builder.addCase(fetchAllSpecial.fulfilled, (state, action) => {
      state.allSpecial = action.payload.data
    }),
    builder.addCase(fetchAllSpecial.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  }
})


export const { actions: allSpecialSliceActions  } = allSpecialSlice
export const { reducer: allSpecialSliceReducer  } = allSpecialSlice

const initialStateRecords = {
  isLoading: false,
  error: "",
  records: [] as FetchGetRecordsData[],
  message: ""
}

export const recordsSlice = createSlice({
  name: 'records',
  initialState: initialStateRecords,
  reducers: {

  },
  extraReducers: (builder)=>{
    builder.addCase(fetchGetRecords.pending, (state)=>{
      state.isLoading = true
    }),
    builder.addCase(fetchGetRecords.fulfilled, (state, action: PayloadAction<FetchGetRecordsResponse>) => {
      state.records = action.payload.data
    }),
    builder.addCase(fetchGetRecords.rejected, (state) => {
      state.isLoading = false
      // state.error = action.payload
    })
  }
})

export const { actions: recordsEventsSliceActions  } = recordsSlice
export const { reducer: recordsEventsSliceReducer  } = recordsSlice

const initialStateCreateEvent = {
  isLoading: false,
  error: "",
}




export const createEventSlice = createSlice({
  name: 'createEvent',
  initialState: initialStateCreateEvent,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchCreateEvents.pending, (state)=>{
      state.isLoading = true
    }),
    builder.addCase(fetchCreateEvents.fulfilled, (state) => {
      state.isLoading = false
    }),
    builder.addCase(fetchCreateEvents.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload?.message as string
    })
  }
})

export const { actions: createEventSliceActions  } = createEventSlice
export const { reducer: createEventSliceReducer  } = createEventSlice

const initialStateDeleteEvent = {
  isLoading: false,
  error: "",
  message: "",
  statusCode: 0
}

export const deleteEventSlice = createSlice({
  name: 'deleteEvent',
  initialState: initialStateDeleteEvent,
  reducers: {

  },
  extraReducers: (builder)=>{
    builder.addCase(fetchDeleteEvent.pending, (state)=>{
      state.isLoading = true
    }),
    builder.addCase(fetchDeleteEvent.fulfilled, (state, action) => {    
      state.isLoading = false
      state.message = action.payload.message
    }),
    builder.addCase(fetchDeleteEvent.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { actions: deleteEventSliceActions  } = deleteEventSlice
export const { reducer: deleteEventSliceReducer  } = deleteEventSlice


const initialStateStatsEvent = {
  isLoading: false,
  error: "",
  peopleStatsYear: 0,
  peopleStatsMonth: 0,
  listSchool: [],
  mostPopularSpecialty: {
    title: "",
    totalRegistrations: 0,
    eventsCount: 0
  }
}


export const statsEventSlice = createSlice({
  name: 'statsEvent',
  initialState: initialStateStatsEvent,
  reducers: {

  },
  extraReducers: (builder)=>{
    builder.addCase(fetchGetStatsEventsYear.fulfilled, (state, action) => {
      state.peopleStatsYear = action.payload.data
    }),
    builder.addCase(fetchGetStatsEventMount.fulfilled, (state, action) => {
      state.peopleStatsMonth = action.payload.data
    }),
    builder.addCase(fetchGetStatsSchool.fulfilled, (state, action) => {
      state.listSchool = action.payload.data as []
    }),
    builder.addCase(fetchGetStatsEventPopularSpecial.fulfilled, (state, action) => {
      state.mostPopularSpecialty.title = action.payload.data.title
      state.mostPopularSpecialty.totalRegistrations = action.payload.data.totalRegistrations
      state.mostPopularSpecialty.eventsCount = action.payload.data.eventsCount
    })
  }
})

export const { actions: statsEventSliceActions  } = statsEventSlice
export const { reducer: statsEventSliceReducer  } = statsEventSlice
