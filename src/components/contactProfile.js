import React from 'react'
import { useSelector } from 'react-redux'
import Profile from './Profile'


function ContactProfile() {
  const user=useSelector(state => state.user)
  return <Profile user={user} />
}

export default ContactProfile
