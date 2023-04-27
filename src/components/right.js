import React, { useEffect, useRef } from 'react'
import '../css/Home.css'
import ChatTopBar from './chatTopBar'
import ChatBottomBar from './chatBottomBar'
import Chatroom from './chatroom'
import { useSelector } from 'react-redux'


function Right() {
  const selectedchat=useSelector(state =>  state.selectedchat )
  const menuref=useRef()

const Renderchatroom=()=>{
  if(selectedchat.propic !== undefined){
    return (
      <div className='right' >
        <ChatTopBar menu={menuref} />
        <Chatroom menu={menuref} />
        <ChatBottomBar/>
        <ul className='chatusermenu' ref={menuref} style={{visibility:'hidden'}} >
          <li>contact</li>
          <li>delete</li>
          <li>Block</li>
        </ul>
      </div>
    )
  }else{
    return(
    <div className='rightnone' >
      <h2>Select a friend to Chat</h2>
    </div>)
  }
}
return(
  <Renderchatroom/>
)

  
  
}

export default Right
