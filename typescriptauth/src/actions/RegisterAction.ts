import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import { IRegisterErrorResponse, IRegisterModel, IReturnedResponse } from "../components/Register/types";
import { REGISTER_USER, TYPE_ACTION } from "../redux/reducers/userReducer/types";
import axiosCreate from "../services/axiosCreate";


export const RegisterAction = (data: IRegisterModel) =>async (dispatch: Dispatch<REGISTER_USER>) => 
{
    try {
        var formData = new FormData();
        
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key,value);
        });
        var user = await axiosCreate.post<IReturnedResponse>('api/auth/register', formData);
        
        const {access_token} = user.data;
        dispatch({
            type: TYPE_ACTION.REGISTER,
            payload: user.data
        });

        localStorage.setItem('access_token', access_token);
        return Promise.resolve();
    }catch(ex) {
        if(axios.isAxiosError(ex))
        {
            const serverError : AxiosError<IRegisterErrorResponse> = ex;
            if(serverError && serverError.response)
            {
                const {data} = serverError.response;
                return Promise.reject(data);
            }
        }
        return Promise.reject(ex);
    }
}