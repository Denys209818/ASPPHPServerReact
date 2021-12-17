import { Outlet } from "react-router";
import DefaultNavbar from "../../components/Default/Navbar";


const DefaulLayout:React.FC = ()=>{
    return (<>

    <DefaultNavbar/>
    <div className="container">
        <Outlet/>
    </div>
    </>);
}

export default DefaulLayout;