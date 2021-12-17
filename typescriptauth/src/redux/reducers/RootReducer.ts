import { combineReducers } from "redux";
import productReducer from "./productReducer/index";
import userReducer from "./userReducer/userReducer";



export const RootReducer = combineReducers({
    user: userReducer,
    products: productReducer
});

export type RootReducers = ReturnType<typeof RootReducer>;