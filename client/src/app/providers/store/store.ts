import { eventsSliceReducer } from '@/entities/EventsList/model/store/eventsSlice'
import { reviewsReducer } from '@/entities/Reviews/model/slice/reviewsSlice'
import { userSliceReducer } from '@/entities/User/model/store/userSlice'
import { allSpecialSliceReducer, createEventSliceReducer, deleteEventSliceReducer, recordsEventsSliceReducer, statsEventSliceReducer } from '@/features/Admin'
import { RecordliceReducer } from '@/features/Record/model/store/recordSlice'
import { RecordliceGrReducer } from '@/features/RecordGroup/model/store/recordSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    events: eventsSliceReducer,
    user:userSliceReducer,
    reviews:reviewsReducer,
    recordInv: RecordliceReducer,
    recordGr: RecordliceGrReducer,
    allSpecial: allSpecialSliceReducer,
    recordsEvents: recordsEventsSliceReducer,
    createEvent: createEventSliceReducer,
    deleteEvent: deleteEventSliceReducer,
    statsEvent: statsEventSliceReducer
  }
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;