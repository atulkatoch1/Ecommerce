import { configureStore } from "@reduxjs/toolkit";
import productListReducer from './feature/productSlice'
import productDetailsReducer from './feature/productDetailSlice'

export default configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
  });