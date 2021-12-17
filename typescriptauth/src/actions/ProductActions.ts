import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import { FillState, ProductsData, ProductTypes, ResponseProduct, SET_DATA_Action } from "../components/Product/types";
import axiosCreate from "../services/axiosCreate";


export const GetProductsAction = (page: FillState) => 
async (dispatch: Dispatch<SET_DATA_Action>) => 
{
    try {

        var response = await axiosCreate.get<ResponseProduct>
            (`api/product?page=${page.page}&search=${page.search}`
               );
        const { data } = response.data;
        //console.log(data.last_page);
        var productData: ProductsData = {
            products: data.data,
            current_page: data.current_page,
            total: data.total,
            last_page: data.last_page
        }
        dispatch({
            type: ProductTypes.SET_DATA,
            payload: productData
        });

        return Promise.resolve(data.data);
    } catch (ex) {
        if(axios.isAxiosError(ex)) 
        {
            var error = ex as AxiosError;
            return Promise.reject(ex);
        }
        return Promise.reject(ex);
    }
}