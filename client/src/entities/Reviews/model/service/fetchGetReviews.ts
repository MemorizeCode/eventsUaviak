import { $api } from "@/app/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetReviews: any = createAsyncThunk("fetchGetReviews", 
    async ()=> {
        const response = await $api.get('/reviews/getReviews')
        console.log(response)
        return response.data
    }
)