import { createSlice } from "@reduxjs/toolkit";
import Cookie from 'js-cookie'
import axios from "axios";
import { BASE_API } from "../utils/constant";

const initialState = {
    cartItems: Cookie.get("cartItems") ? JSON.parse(Cookie.get("cartItems")) : []
}
  
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const product = state.cartItems.find(x=> x.product === item.product);
            if (product) {
                Cookie.set("cartItems", JSON.stringify(state.cartItems.map(x=>x.product === product.product ? item : x)));
                return { cartItems: state.cartItems.map(x=>x.product === product.product ? item : x)}
            }
            Cookie.set("cartItems", JSON.stringify([...state.cartItems, item]));
            return { cartItems: [...state.cartItems, item] }
        },
        removeFromCart: (state, action) => {
            Cookie.set("cartItems", JSON.stringify(state.cartItems.filter(x=>x.product !== action.payload)));
            return{ cartItems: state.cartItems.filter(x=>x.product !== action.payload) }
        }
    },
    extraReducers: {
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
  