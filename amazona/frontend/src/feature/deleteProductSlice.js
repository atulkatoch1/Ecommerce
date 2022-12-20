import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../utils/constant";
import Cookie from 'js-cookie';

const initialState = {
    successDelete: [],
    loadingDelete: false,
    errorDelete: null,
}


export const deleteProdcut = createAsyncThunk(`product/deleteProduct`,async (id) => {
    let userInfo = Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : [];
    console.log(userInfo.token,'userInfo.token');
   return await axios.delete(`${BASE_API}/api/products/${id}`, {headers:{
    'Authorization': 'Bearer ' + userInfo.token
  }})
});

const deleteProductSlice = createSlice({
    name: 'prodcut',
    initialState,
    reducers: {
    },
    extraReducers: {
        [deleteProdcut.pending]: (state, action) => {
            state.loadingDelete = true
        },
        [deleteProdcut.fulfilled]: (state, action) => {
            state.loadingDelete = false;
            state.successDelete = action.payload.data
        },
        [deleteProdcut.rejected]: (state, action) => {
            state.loadingDelete = false;
            state.errorDelete = action.error
        },
    }
});

export const {  } = deleteProductSlice.actions
export default deleteProductSlice.reducer