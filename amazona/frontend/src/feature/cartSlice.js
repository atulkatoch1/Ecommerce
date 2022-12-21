import { createSlice } from "@reduxjs/toolkit";
import Cookie from 'js-cookie'
import axios from "axios";
import { BASE_API } from "../utils/constant";

const initialState = {
    cartItems: Cookie.get("cartItems") ? JSON.parse(Cookie.get("cartItems")) : [],
    shipping: [],
    payment: {paymentMethod:""}
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
        },
        saveShipping: (state, action) => {
            return{ ...state, shipping: action.payload }
        },
        savePayment: (state, action) => {
            return{ ...state, payment: {paymentMethod: action.payload} }
        }
    },
    extraReducers: {
    }
});

export const { addToCart, removeFromCart, saveShipping, savePayment } = cartSlice.actions
export default cartSlice.reducer
  