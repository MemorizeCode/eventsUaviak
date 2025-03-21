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
        builder.addCase(fetchGetReviews.fulfilled, (state,action)=>{
            console.log(action)
            state.reviewsList = action.payload
        })
        builder.addCase(fetchGetReviews.rejected, (state,action)=>{
            console.log(action)
        })
    }
})

export const {actions: reviewsActions} = reviewsSlice
export const {reducer: reviewsReducer} = reviewsSlice