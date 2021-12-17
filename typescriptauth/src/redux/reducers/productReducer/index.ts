import { ProductActions, ProductState, ProductTypes } from "../../../components/Product/types";

var initialValues: ProductState = 
{
    products: [],
    current_page: 0,
    total: 0,
    last_page: 0
}

const productReducer = (state:ProductState = initialValues, action:ProductActions) : ProductState => 
{
    switch(action.type) 
    {
        case ProductTypes.SET_DATA: 
        {
            var newState: ProductState = 
            {
                products: action.payload.products,
                current_page: action.payload.current_page,
                total: action.payload.total,
                last_page: action.payload.last_page
            }
            return newState;
        }
        default: 
        {
            return state;
        }
    }
}

export default productReducer;