import { IReturnedLogin } from "../../../actions/types/LoginTypes";
import { IRegisterModel, IReturnedResponse } from "../../../components/Register/types";

export enum TYPE_ACTION 
{
    LOGIN="LOGIN",
    LOGOUT="LOGOUT",
    REGISTER="REGISTER"
}

export interface UserModel 
{
    name?: string;
    email?: string;
    isAuth: boolean;
    access_token?: string;
    Image?: string;
}



// Action Types
export interface LOGIN_USER 
{
    type: TYPE_ACTION.LOGIN,
    payload: IReturnedLogin
}

export interface LOGOUT_USER 
{
    type: TYPE_ACTION.LOGOUT
}

export interface REGISTER_USER 
{
    type: TYPE_ACTION.REGISTER,
    payload: IReturnedResponse
}


export type UserActionTypes = LOGIN_USER | LOGOUT_USER | REGISTER_USER;