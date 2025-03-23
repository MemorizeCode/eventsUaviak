import  $api  from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchGetReviewsResponse {
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
        const response = await $api.get<FetchGetReviewsResponse>('/reviews/getReviews')
        return response.data
    }
)