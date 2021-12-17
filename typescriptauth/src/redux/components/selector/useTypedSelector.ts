import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootReducers } from "../../reducers/RootReducer";


export const useTypedSelector: TypedUseSelectorHook<RootReducers>=useSelector;