import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from 'js-cookie';
import { BASE_API } from "../utils/constant";

const initialState = {
    successSave: [],
    loadingSave: false,
    errorSave: null,
}

export const saveProduct = createAsyncThunk(`products/saveProduct`,async (product) => {
    let userInfo = Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : [];
      return await axios.post(`${BASE_API}/api/products`, product, {headers:{
        'Authorization': 'Bearer ' + userInfo.token
      }}) 
  });

export const updateProduct = createAsyncThunk(`products/updateProduct`,async (product) => {
    let userInfo = Cookie.get("userInfo") ? JSON.parse(Cookie.get("userInfo")) : [];
      return await axios.put(`${BASE_API}/api/products/${product._id}`, product, {headers:{
        'Authorization': 'Bearer ' + userInfo.token
      }})  
  });
  
const productSaveSlice = createSlice({
    name: 'productsSave',
    initialState,
    reducers: {
    },
    extraReducers: {
        [saveProduct.pending]: (state, action) => {
          state.loadingSave = true
        },
        [saveProduct.fulfilled]: (state, action) => {
          state.loadingSave = false;
          state.successSave = action.payload.data
        },
        [saveProduct.rejected]: (state, action) => {
          state.loadingSave = false;
          state.errorSave = action.error.message
        },
        [updateProduct.pending]: (state, action) => {
          state.loadingSave = true
        },
        [updateProduct.fulfilled]: (state, action) => {
          state.loadingSave = false;
          state.successSave = action.payload.data
        },
        [updateProduct.rejected]: (state, action) => {
          state.loadingSave = false;
          state.errorSave = action.error.message
        },
    }
});

export const {  } = productSaveSlice.actions
export default productSaveSlice.reducer