import $api from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface DeleteReviewsData {
    idReview: number | string
}

export interface DeleteReviewsResponse {
    message: string;
}

export interface DeleteReviewsError {
    message: string;
    status: "error" | "warning";
}

export const fetchDeleteReviews = createAsyncThunk<DeleteReviewsResponse, DeleteReviewsData, { rejectValue: DeleteReviewsError }>("adminDeleteReviews",
    async (data: DeleteReviewsData, thunkAPI) => {
        try {
            const idReview = Number(data.idReview)
            if (!idReview) {
                return thunkAPI.rejectWithValue({
                    message: "Поле пустое",
                    status: "warning",
                })
            }

            const response = await $api.delete<DeleteReviewsResponse>(`/reviews/deleteReviews/?id=${idReview}`)
            if (response?.status === 200) {
                return response?.data
            }
            return thunkAPI.rejectWithValue({
                message: response?.data?.message,
                status: "error",
            })
        }
        catch (e: unknown) {
            const error = e as { response: { data: DeleteReviewsError } }
            return thunkAPI.rejectWithValue({
                status: 'error',
                message: error.response.data.message
            })
        }
    })

