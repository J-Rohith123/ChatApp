import Home from './components/Home';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Register from './auth/register';
import Login from './auth/login';
import './css/form.css'
import { useEffect, useLayoutEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import * as actions from './actions/actions'
import { useDispatch } from 'react-redux';
import ContactProfile from './components/contactProfile';
import ChatUserProfile from './components/chatUserProfile';

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(actions.getUsers())
    let currentuser = Cookies.get('currentuser')
    if(currentuser != undefined){
      dispatch(actions.setUser(currentuser ))
    }
    let chatuser=Cookies.get('chatuser')
    if(chatuser != undefined){
      dispatch(actions.setChatUser(chatuser))
    }
  },[])
  
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='home' element={<Home/>} />
        <Route path='home/profile' element={<ChatUserProfile/>} />
        <Route path='profile' element={<ContactProfile/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
