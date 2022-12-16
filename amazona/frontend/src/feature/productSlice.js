import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../utils/constant";

const initialState = {
    products: [],
    loading: false,
    error: null,
}

export const listProducts = createAsyncThunk(`products/getProducts`,async () => {
   return await axios.get(`${BASE_API}/api/products`)
});

const productListSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: {
        [listProducts.pending]: (state, action) => {
            state.loading = true
          },
          [listProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data
          },
          [listProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error
          },
    }
});

export const {  } = productListSlice.actions
export default productListSlice.reducer