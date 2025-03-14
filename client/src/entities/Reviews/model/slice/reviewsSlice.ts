import { createSlice } from "@reduxjs/toolkit";
import { fetchGetReviews } from "../service/fetchGetReviews";

export const reviewsSlice = createSlice({
    name:"reviewsSlice",
    initialState:{
        reviewsList: []
    },
    reducers:{

    },
    extraReducers: (builder) =>{
        builder.addCase(fetchGetReviews.fulfilled, (state,action)=>{
            console.log(action)
            state.reviewsList = action.payload
        })
    }
})

export const {actions: reviewsActions} = reviewsSlice
export const {reducer: reviewsReducer} = reviewsSlice