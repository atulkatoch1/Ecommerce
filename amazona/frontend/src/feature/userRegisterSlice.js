import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../utils/constant";
import Cookie from 'js-cookie'

const initialState = {
    userInfo: Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : null,
    loading: false,
    error: null,
}

export const register = createAsyncThunk(`user/register`,async (user) => {
    const {name, email, password} = user;
   return await axios.post(`${BASE_API}/api/users/register`, {name, email, password})
});

const userRegisterSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: {
        [register.pending]: (state, action) => {
        state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.data
            Cookie.set("userInfo", JSON.stringify(action.payload.data));
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
            Cookie.set("userInfo", JSON.stringify(action.error.message));
        },
        },
    });

export const {  } = userRegisterSlice.actions
export default userRegisterSlice.reducer