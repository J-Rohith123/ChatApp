import React from 'react'
import { useLocation } from 'react-router'
import Profile from './Profile'

function ChatUserProfile() {
    const user=useLocation().state
  return <Profile user={user}/>
}

export default ChatUserProfile
