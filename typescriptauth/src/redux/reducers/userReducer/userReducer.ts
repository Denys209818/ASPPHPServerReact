import { TYPE_ACTION, UserActionTypes, UserModel } from "./types";

var initialState: UserModel = 
{
    email:'',
    name:'',
    isAuth: false,
    access_token: '',
    Image:''
}

const userReducer = (state:UserModel = initialState, action: UserActionTypes) : UserModel  => 
{
    switch(action.type) 
    {
        case TYPE_ACTION.LOGIN: 
        {
            return {
                email: action.payload.user?.email,
                name: action.payload.user?.name,
                isAuth: true,
                access_token: action.payload.access_token,
                Image: action.payload.user?.Image
            }; 
        }
        case TYPE_ACTION.REGISTER:
        {
            return {
                email: action.payload.user?.email,
                name: action.payload.user?.name,
                isAuth: true,
                access_token: action.payload.access_token,
                Image: action.payload.user?.Image
            }; 
        }
        case TYPE_ACTION.LOGOUT: 
        {
            return {
                name:'',
                email:'',
                isAuth: false,
                access_token: '',
                Image: ''
            }
        }
        default : 
        {
            return state;
        }
    }
}

export default userReducer;