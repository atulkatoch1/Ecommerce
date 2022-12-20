import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../utils/constant";
import Cookie from 'js-cookie'

const initialState = {
    userInfo: Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : null,
    loading: false,
    error: null,
}

export const signin = createAsyncThunk(`user/signin`,async (user) => {
    const {email, password} = user;
   return await axios.post(`${BASE_API}/api/users/signin`, {email, password})
});

const userSigninSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: {
        [signin.pending]: (state, action) => {
        state.loading = true
        },
        [signin.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.data
            Cookie.set("userInfo", JSON.stringify(action.payload.data));
        },
        [signin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
            Cookie.set("userInfo", JSON.stringify(action.error.message));
        },
        },
    });

export const {  } = userSigninSlice.actions
export default userSigninSlice.reducer