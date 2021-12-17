

export interface ILoginModel 
{
    email: string,
    password: string
}

export interface ILoginErrorResponse 
{
    email: Array<string>,
    password: Array<string>,
    error: string
}