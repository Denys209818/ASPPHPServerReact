
export enum ProductTypes 
{
    SET_DATA="SET_DATA"
}

export interface IUser 
{
    id: number,
    name: string,
    description:string,
    price: number
}

export interface ProductState 
{
    current_page: number,
    products: Array<IUser>,
    total: number,
    last_page: number
}

export interface ProductsData 
{
    products: Array<IUser>,
    current_page: number,
    total: number,
    last_page: number
}



export interface ProductsResponseData 
{
    data: Array<IUser>,
    current_page: number,
    total: number,
    last_page: number
}

export interface ResponseProduct 
{
    data: ProductsResponseData
}

export interface FillState 
{
    page?: String|null,
    search?: String|null
}


export interface SET_DATA_Action 
{
    type:ProductTypes.SET_DATA,
    payload: ProductsData
}

export type ProductActions = SET_DATA_Action;




