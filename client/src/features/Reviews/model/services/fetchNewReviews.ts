import  $api  from "@/app/config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"


export interface IReview {
    name: string,
    reviews: string,
    stars: number
}

export interface IReviewResponse {
    message: string
}

interface IReviewError {
    message: string
    error: string
}

export const fetchNewReviews = createAsyncThunk<IReviewResponse, IReview, {rejectValue: IReviewError}>('reviews/fetchNewReviews', async (e: IReview, thunkAPI) => {
    try{
        
        const response = await $api.post<IReviewResponse>('/reviews/createReviews', {
            name: e.name,
            reviews: e.reviews,
            stars: e.stars
        })
        if(response?.status == 200){
            return response.data
        }
        return thunkAPI.rejectWithValue({
            message: response.data?.message,
            error: "error"
        })
    }
    catch(e: unknown){
        const error = e as { response: { data: IReviewError } }
        return thunkAPI.rejectWithValue({
            message: error.response.data.message,
            error: error.response.data.error
        })
    }
})
