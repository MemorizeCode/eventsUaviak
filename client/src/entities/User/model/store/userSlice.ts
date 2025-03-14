import { createSlice } from '@reduxjs/toolkit';
import { fetchIsAuth } from '../service/fetchIsAuth';


const initialState = {
  auth: false,
  isLoading: true,
  role: 'USER',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setIsLoading: (state, action) => {
      console.log(action)
      state.isLoading = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) =>{
    builder.addCase(fetchIsAuth.pending, (state)=>{
      state.isLoading = true
    })
    builder.addCase(fetchIsAuth.fulfilled, (state, payload)=>{
      state.isLoading = false
      state.auth = true
      state.role = payload.payload.role
      localStorage.setItem("accessToken", payload.payload.accessToken)
      localStorage.setItem("refreshToken", payload.payload.refreshToken)
    })
    builder.addCase(fetchIsAuth.rejected, (state)=>{
      state.isLoading = false
    })
}
});

export const {actions: userSliceActions} = userSlice
export const {reducer: userSliceReducer} = userSlice