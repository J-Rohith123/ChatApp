import React from 'react'
import '../css/contactprofile.css'

function Profile(props) {
  return (
    <div>
      <div className='cprofile'>
      <div className='imgcontainer'>
      <img src={props.user.propic}></img>
      <h3>{props.user.name}</h3>
      </div>
      <div className='profilecontainer'>
       <h2>Profile</h2>
       <p><b>Email: </b>{props.user.email}</p>
       <p><b>Mobile No: </b>{props.user.phone}</p>
      </div>
    </div>
    </div>
  )
}

export default Profile
