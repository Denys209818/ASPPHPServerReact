import { UserModel } from "../../redux/reducers/userReducer/types";

export interface IReturnedLogin 
{
    access_token: string,
    user: null| UserModel
}