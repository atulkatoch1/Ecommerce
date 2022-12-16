import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../utils/constant";

const initialState = {
    product: [],
    loading: false,
    error: null,
}

export const detailsProduct = createAsyncThunk(`product/getProductDetails`,async (id) => {
   return await axios.get(`${BASE_API}/api/products/${id}`)
});

const productDetailSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: {
        [detailsProduct.pending]: (state, action) => {
            state.loading = true
        },
        [detailsProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload.data
        },
        [detailsProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error
        },
    }
});

export const {  } = productDetailSlice.actions
export default productDetailSlice.reducer