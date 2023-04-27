import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { string } from 'yup/lib/locale'
import '../css/form.css'
import * as actions from '../actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Register() {
  const [ff,setimage]=useState(false)
    const reader=new FileReader()
     const state=useSelector(state => state)
     const dispatch = useDispatch()
     const navigate=useNavigate()
  useEffect(()=>{
       dispatch(actions.getUsers())
  },[]) 
  

   const validationschema=Yup.object({
    name:Yup.string().min(2).max(25).required('Please type your Username'),
    email:Yup.string().email('Please enter a valid email').required('Please enter your Email'),
    password:Yup.string().min(6).required('Please enter your password'),
    phone:Yup.number().required('Please mention your phone number')
   })

   const {values,errors,handleSubmit,handleChange,handleBlur,touched}=useFormik({
    initialValues:{name:'',email:'',password:'',phone:null,propic:'nopic.png',messages:[]},
    validationSchema:validationschema,
    onSubmit:(values)=>{
       dispatch(actions.addUser(values))
      navigate('/')
      console.log(values)
    }
   })

  return (
    <div className='formcontainerreg'>
      <div className='registerform'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>

        <div className='piccontainer'>
        <label htmlFor='propic' ><img src={values.propic} /></label>
        <input type='file' 
         id='propic'
         name='propic'
         onChange={ e => {
          let file=URL.createObjectURL( e.target.files[0])
          values.propic=file
          console.log(values.propic)
          setimage(true)
        }
        }
         > 
         </input>
        </div>

      <div className='inputelements'>
      <div className='inputelement'>
      <label htmlFor='name'>Username<sup>*</sup></label>
      <input type='text'
           name='name'
           id='name'
           placeholder='Username'
           value={values.name} 
           onChange={handleChange}
           onBlur={handleBlur}
           autoFocus 
           autoComplete='off' />
        { errors.name && touched.name? <p className='errormsg'>{errors.name}</p> : null}
      </div>

      <div className='inputelement'>
      <label htmlFor='email' id='email'>Email Id<sup>*</sup></label>
      <input type='email'
          name='email'
          placeholder='Email'
          value={values.email}
          onChange={handleChange}
           onBlur={handleBlur}
          autoComplete='off' />
          { errors.email && touched.email? <p className='errormsg'>{errors.email}</p> : null}
      </div>

      <div className='inputelement'>
      <label htmlFor='password' id='password'>Password<sup>*</sup></label>
      <input type='password'
           name='password'
           placeholder='Password'
           value={values.password}
           onChange={handleChange}
           onBlur={handleBlur}
           autoComplete='off' />
           { errors.password && touched.password? <p className='errormsg'>{errors.password}</p> : null}
      </div>

      <div className='inputelement'>
      <label htmlFor='phone' id='phone'>Phone Number<sup>*</sup></label>
      <input type='number'
          name='phone'
          placeholder='Phone Number'
          value={values.phone}
          onChange={handleChange}
           onBlur={handleBlur}
          autoComplete='off' />
          { errors.phone && touched.phone? <p className='errormsg'>{errors.phone}</p> : null}
      </div>
      <button type='submit' className='submitbutton'  >Register</button>
      <p  style={{fontSize:'0.9rem'}} >Already registered?<a href='/'>Sign in Here</a></p>
      </div>

      </form>
      </div>
    </div>
  )
}

export default Register
