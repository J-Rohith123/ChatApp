import React, { useCallback, useEffect,useMemo,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/Home.css'
import Message from './Message'
import * as actions from '../actions/actions'


function Chatroom(props) {
  const messages = useSelector(state => state.user.messages[0]? state.user.messages : [{mid:2,type:'sent',value:'Hi',timestamp:'',date:''}])
  const chatbuddy=useSelector(state => state.selectedchat)
  const currentuser=useSelector(state => state.user)
  let datearray=[]
  const lastmsg=useRef()
  const dispatch=useDispatch()
  
  useEffect(()=>{
   lastmsg.current.scrollIntoView()
  },[messages])

  

 const setread=()=>{
  
  let updatedmsgsrec=[]
  let updatedmsgssen=[]
  chatbuddy.messages.map(msg=>{
   if(msg.read==false && msg.mid==currentuser.id && msg.type=="sent" ){
     updatedmsgsrec.push({...msg,read:true})
   }
  })
  currentuser.messages.map(msg=>{
    if(msg.read==false && msg.mid==chatbuddy.id && msg.type=="receive"){
      updatedmsgssen.push({...msg,read:true})
    }
   })
  if(updatedmsgsrec.length !=0 || updatedmsgssen.length!=0){
    dispatch(actions.setread(currentuser,chatbuddy,updatedmsgsrec,updatedmsgssen))
  }
 
 }
 
 useEffect(()=>{
  setread()
},[])

  const Datedesc=(props)=>{
   
    if(datearray.includes(props.datestamp)) return null
    
      datearray.push(props.datestamp)
     return <p className='daterow'>{props.datestamp}</p>
    
  }

  return (
    <div className='chatroom'  onClick={()=>{ props.menu.current.style.visibility = 'hidden' }}   > 
    { 
      messages.map(message =>{
          if(chatbuddy.id === message.mid){
            {return <>
            <Datedesc datestamp={message.datestamp}/>
            <Message msgtype={message.type} value = {message.value} read={message.read} timestamp={message.timestamp}/>
            </>
          }
          }
        })
    }
    <div ref={lastmsg}></div>
    </div>
  )
}

export default Chatroom
