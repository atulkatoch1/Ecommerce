import { configureStore } from "@reduxjs/toolkit";
import productListReducer from './feature/productSlice'
import productDetailsReducer from './feature/productDetailSlice'
import cartSliceReducer from './feature/cartSlice'

export default configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
  });