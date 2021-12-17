import { Link } from "react-router-dom";


const NoMatch: React.FC = () => 
{
    return (<div className="container">
        <h1>Сторінки не існує</h1>
        <p><Link to="/">Перейти на Головну сторінку</Link></p>
    </div>);
}

export default NoMatch;