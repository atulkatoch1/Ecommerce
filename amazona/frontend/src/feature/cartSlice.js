import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../utils/constant";

const initialState = {
    cartItems: []
}
  
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const product = state.cartItems.find(x=> x.product === item.product);
            if (product) {
                return { cartItems: state.cartItems.map(x=>x.product === product.product ? item : x)}
            }
            return { cartItems: [...state.cartItems, item] }
        }
    },
    extraReducers: {
    }
});

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
  