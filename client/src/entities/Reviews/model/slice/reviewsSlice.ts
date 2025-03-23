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
        builder.addCase(fetchGetReviews.pending, ()=>{
            console.log("pending")
        })
        builder.addCase(fetchGetReviews.fulfilled, (state, payload: any)=>{
            state.reviewsList = payload.payload
        })
        builder.addCase(fetchGetReviews.rejected, ()=>{

        })
    }
})

export const {actions: reviewsActions} = reviewsSlice
export const {reducer: reviewsReducer} = reviewsSlice