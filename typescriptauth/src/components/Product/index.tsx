import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../../actions/BindingActions";
import { useTypedSelector } from "../../redux/components/selector/useTypedSelector";
import { FillState } from "./types";



const Product: React.FC = () => 
{
    const navigate = useNavigate();
    var searchparams = new URLSearchParams(window.location.search);
    const [loading, setLoading] = useState<Boolean>(false);
    const {GetProductsAction} = useActions();
    const [params, setParams] = useState<FillState>({
        page: searchparams.get("page") ? searchparams.get("page"): null,
         search: searchparams.get("search") ? searchparams.get("search") : null});
         
         
         const {products, current_page, total, last_page} = useTypedSelector(store => store.products);
         var buttons:Array<number> = new Array(last_page);
         for(var i = 0; i < last_page; i++) {buttons.push(i+1)}

    async function GetProduncts() 
    {
        
        setLoading(true);
        await GetProductsAction({
            page: params.page ? params.page : "1",
            search: params.search ? params.search : ""
        });
       
        setLoading(false);
    }
    useEffect(() => {
        (document.getElementById("search") as HTMLInputElement).setAttribute("value", params.search ? 
        params.search as string: ""); 
        try {
            GetProduncts();
            
        } catch (ex) {
            setLoading(false);
        }
    }, [params]);


    return (<div className="container">
        <div className="row">
            <div className="col-md-8 offset-2 mt-3">
                <form className="d-flex" onSubmit={(e: React.SyntheticEvent):void => 
                    {
                        e.preventDefault();
                        var text = (e.currentTarget.children.item(0) as HTMLInputElement).value;
                        setParams({
                            page:"1",
                            search: text
                        });
                        navigate("?search=" + text);
                    }}>
                    <input className="form-control me-2" type="search" id="search" name="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Пошук</button>
                </form>
                <h2 className="text-center">Список продуктів</h2>
                {loading && <h2>Загрузка...</h2>}
                <table className="table table-stripped table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Номер</th>
                            <th scope="col">Назва</th>
                            <th scope="col">Опис</th>
                            <th scope="col">Ціна</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td scope="row">{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                </tr>
                            );
                        })}

                         
                    </tbody>
                </table>
                <ul className="pagination">
                        {buttons && buttons.map((button, index) => {
                            var link = `?page=${button}` + (params.search ? `&search=${params.search}` : "");
                            var classn= (button == current_page) ? "page-item active" : "page-item";
                            
                          return <li key={index} className={classn}><Link className="page-link"
                            onClick={() => {

                                setParams({
                                    page: button.toString(),
                                    search: params.search
                                })
                            }}
                           to={link}>{button}</Link></li>
                        })}
                        </ul>
            </div>
        </div>
    </div>);
}

export default Product;