import axios, { AxiosError } from "axios"
import { Dispatch } from "react"
import { ILoginErrorResponse, ILoginModel } from "../components/Login/types"
import { LOGIN_USER, LOGOUT_USER, TYPE_ACTION, UserActionTypes } from "../redux/reducers/userReducer/types"
import axiosCreate from "../services/axiosCreate"
import { IReturnedLogin } from "./types/LoginTypes"


export const LoginAction = (data: ILoginModel) => async (dispatch: Dispatch<UserActionTypes>) => 
{
    try {
        

        var user = await axiosCreate.post<IReturnedLogin>('api/auth/login', data);
        const {access_token} = user.data;
        dispatch({
            type: TYPE_ACTION.LOGIN,
            payload: user.data
        });

        localStorage.setItem('access_token', access_token);
        return Promise.resolve(user.data);
    }catch(ex) {
        if(axios.isAxiosError(ex))
        {
            const serverError : AxiosError<ILoginErrorResponse> = ex;
            if(serverError && serverError.response)
            {
                const {data} = serverError.response;
                return Promise.reject(data);
            }
        }
        return Promise.reject(ex);
    }
}


export const LoginUser = (data: IReturnedLogin) => async(dispatch: Dispatch<LOGIN_USER>) => 
{
    dispatch({
        type: TYPE_ACTION.LOGIN,
        payload: data
    });
}


export const LogoutUser = () => async(dispatch: Dispatch<LOGOUT_USER>) => 
{
    console.log("LOGOUT");
    dispatch({type: TYPE_ACTION.LOGOUT});
}

