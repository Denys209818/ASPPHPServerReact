import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../../../actions/BindingActions";
import { useTypedSelector } from "../../../redux/components/selector/useTypedSelector";


const DefaultNavbar: React.FC = () => 
{
  const navigate = useNavigate();
  const {LogoutUser} = useActions();
  const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => 
  {
      e.preventDefault();
      localStorage.removeItem('access_token');
      LogoutUser();
      navigate('/');
  }

  const {isAuth, name} = useTypedSelector(auth => auth.user);
    return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
  <a className="navbar-brand" href="#">Web Site</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Головна сторінка</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/product">Продукти</Link>
      </li>
    </ul>
    {!isAuth && 
    <ul className="navbar-nav">
        <li className="nav-item">
            <Link className="nav-link" to="/login">Логін</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/register">Реєстрація</Link>
        </li>
    </ul>}
    {isAuth && 
    <ul className="navbar-nav">
    <li className="nav-item">
        <Link className="nav-link" to="#">{name}</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/logout" onClick={onClickHandler}>Вийти</Link>
    </li>
</ul>}
  </div>
  </div>
</nav>
    </>);
}

export default DefaultNavbar;