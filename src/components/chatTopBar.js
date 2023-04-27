import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import '../css/Home.css'

function ChatTopBar(props) {
  const chatuser=useSelector(state => state.selectedchat)
  const navigate=useNavigate()
  const openmenu=()=>{
    if(props.menu.current.style.visibility == 'hidden'){
    props.menu.current.style.visibility = 'visible'
    }else{
      props.menu.current.style.visibility = 'hidden'
    }
  }

  return (
    <div className='chattopbar'>
      <div className='userpro'>
        <img src={chatuser.propic}></img>
      <b onClick={()=>navigate('profile',{state:chatuser})}>{chatuser.name}</b>
      </div>
      <div className='icons'>
      <ion-icon name="videocam-outline"></ion-icon>
      <ion-icon name="person-add-outline"></ion-icon>
      <ion-icon name="ellipsis-vertical-outline"   onClick={openmenu} ></ion-icon>
      </div>
    </div>
  )
}

export default ChatTopBar
