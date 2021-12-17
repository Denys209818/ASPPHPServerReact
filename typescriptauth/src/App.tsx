import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import DefaulLayout from './containers/DefaulLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import jwt from 'jsonwebtoken';
import { TYPE_ACTION, UserModel } from './redux/reducers/userReducer/types';
import { IReturnedLogin } from './actions/types/LoginTypes';
import { useDispatch } from 'react-redux';
import { useActions } from './actions/BindingActions';
import Register from './components/Register';
import Product from './components/Product';

const App:React.FC = ()=> {
  const {LoginUser} = useActions();
  var token = localStorage.getItem('access_token');
if(token) 
{
  var user:IReturnedLogin = {
    access_token:token,
    user: jwt.decode(token) as UserModel
  };
  
  LoginUser(user);
}
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaulLayout/>}>
            <Route index element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="*" element={<NoMatch/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
