import $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchGetReviewsResponse {
    data: ReviewsSchema[]
    key: string
}

export interface ReviewsSchema {
    id: number
    name: string
    title: string
    stars: number
    isDeleted: Boolean
}


interface FetchGetReviewsError {
    message: string
    error: string
}

export const fetchGetReviews = createAsyncThunk<FetchGetReviewsResponse, string | undefined, { rejectValue: FetchGetReviewsError }>("fetchGetReviews",

    async (key: string | undefined, { rejectWithValue }) => {
        try {
            const response = await $api.get<FetchGetReviewsResponse>('/reviews/getReviews')
            return {
                data: response?.data.data,
                key: key || "default"
            }
        }
        catch (e) {
            return rejectWithValue({
                message: "Не известная ошибка",
                error: '500'
            });
        }
    }
)