import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/Home.css'
import * as actions from '../actions/actions'
import { useNavigate } from 'react-router'

function UserBox() {
  const [userstate,setuserstate] = useState({})
  const user = useSelector(state => state? state.user : {name:'',propic:''})
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const logout=()=>{
    if(window.confirm("Are you sure you want to logout?")){
       dispatch(actions.Logout())
       navigate('/')
    }
  }
  useEffect(()=>{
    setuserstate(user)
  },[user.name,user.propic])
  return (
    <div className='userbox'>
      <b>Chat App</b>
      <div className='user'>
        <img src={userstate.propic}></img>
       <p onClick={()=>navigate('/profile')}>{userstate.name}</p>
       <button onClick={logout} >Logout</button>
      </div>
    </div>
  )
}

export default UserBox
