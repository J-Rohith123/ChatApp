import React from 'react'
import '../css/Home.css'
import Contacts from './contacts'
import UserBox from './userBox'

function Left() {
  return (
    <div className='left'>
      <UserBox/>
      <Contacts/>
    </div>
  )
}

export default Left
