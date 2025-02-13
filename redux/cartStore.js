import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import dishReducer from './dishSlice';
import userReducer from './userSlice';

export const store= configureStore({
    reducer:{
        cart:cartReducer,
        dishes:dishReducer,
        user:userReducer
    }
});