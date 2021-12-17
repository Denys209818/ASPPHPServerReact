import { UserModel } from "../../redux/reducers/userReducer/types";


export interface IRegisterModel 
{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    Image: File | null;
}

export interface IRegisterErrorResponse 
{
    email: Array<string>,
    password: Array<string>,
    name: Array<string>,
    password_confirmation: Array<string>,
    message: string
}

export interface IReturnedResponse 
{
    access_token: string;
    user: UserModel
}