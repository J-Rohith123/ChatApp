import Cookies from 'js-cookie'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import * as actions from '../actions/actions'
import '../css/form.css'

function Login() {

  const state=useSelector(state => state)
  const dispatch =useDispatch()
  const [errors,seterrors]=useState('')
  const [userdata,setuserdata]=useState({email:''})
  const navigate=useNavigate()
  
  useLayoutEffect(()=>{
    dispatch(actions.getUsers())
   },[])

   const submit=(e)=>{
    e.preventDefault()
      state.users.map(user =>{
        if(user.email === e.target[0].value) {
           setuserdata(user)
        }
      })
     

      if(userdata.email === ' '){
        seterrors('Email not registered')
        setTimeout(()=>{
          seterrors('')
        },5000)
      }
      else{
        if(userdata.password !== e.target[1].value){ 
          seterrors('Password Incorrect')
          setTimeout(()=>{
            seterrors('')
          },5000)
        }
        else{
          dispatch(actions.setUser(userdata.id))
          Cookies.set('currentuser',userdata.id,{ expires:365 })
          navigate('home')
        }
      }

   }    

  return (
    <div className='formcontainer'>
      <form className='loginform' onSubmit={submit}  >
        {errors?<p style={{color:'red',fontSize:'1rem'}}>{errors}</p>:null}
        <h1>Login</h1>
        <div className='formspace'>
        <div className='inputelement'>
        <label htmlFor='lemail' > Email Id</label>
        <input type='email' className='formfield' id='lemail' required autoFocus />
        </div>
        <div className='inputelement'>
        <label htmlFor='lpass' >Password</label>
        <input type='password' className='formfield' id='lpass' />
        </div>
        <button type='submit' className='submitbutton' >Login</button>
        <p style={{fontSize:'0.9rem'}} >Haven't registered yet?<a href='/register'> Register Here</a></p>
        </div>
        
      </form>
    </div>
  )
}

export default Login
