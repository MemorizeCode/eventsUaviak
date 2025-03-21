import  $api  from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchGetReviewsResponse {
    message: string
    data: ReviewsSchema[]
}

export interface ReviewsSchema {
    id: number
    name: string
    title: string
    stars: number
}

interface FetchGetReviewsError {
    message: string
    error: string
}

export const fetchGetReviews = createAsyncThunk<FetchGetReviewsResponse, void, { rejectValue: FetchGetReviewsError }>("fetchGetReviews", 
    async ()=> {
        const response = await $api.get('/reviews/getReviews')
        return response.data
    }
)