import { configureStore } from "@reduxjs/toolkit";
import productListReducer from './feature/productSlice'
import productDetailsReducer from './feature/productDetailSlice'
import productSaveReducer from './feature/productSaveSlice'
import cartSliceReducer from './feature/cartSlice'
import userSigninReducer from './feature/userSigninSlice'
import userRegisterReducer from './feature/userRegisterSlice'
import deleteProductReducer from './feature/deleteProductSlice'

export default configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productSave: productSaveReducer,
        cart: cartSliceReducer,
        userSignin: userSigninReducer,
        userRegister: userRegisterReducer,
        deleteProduct: deleteProductReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
  });