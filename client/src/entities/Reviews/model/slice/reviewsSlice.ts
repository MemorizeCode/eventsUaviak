import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGetReviews, FetchGetReviewsResponse, ReviewsSchema } from "../service/fetchGetReviews";

interface ReviewsState {
    reviewsList: ReviewsSchema[]
}

const initialState: ReviewsState = {
    reviewsList: []
}

export const reviewsSlice = createSlice({
    name:"reviewsSlice",
    initialState:initialState,
    reducers:{

    },
    extraReducers: (builder) =>{
        builder.addCase(fetchGetReviews.pending, ()=>{
            //загрузка отзывов
        })
        builder.addCase(fetchGetReviews.fulfilled, (state, action:PayloadAction<FetchGetReviewsResponse>)=>{
            if(action.payload.key === "bad"){
                state.reviewsList = action.payload.data
            }
            else{
                state.reviewsList = action.payload.data?.filter((review)=> !review.isDeleted)
            }
        })
        builder.addCase(fetchGetReviews.rejected, () => {

        })
    }
})

export const {actions: reviewsActions} = reviewsSlice
export const {reducer: reviewsReducer} = reviewsSlice