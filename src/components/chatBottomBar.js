import React, { useRef,useEffect } from 'react'
import '../css/Home.css'
import * as actions from '../actions/actions'
import { useDispatch, useSelector } from 'react-redux'

function ChatBottomBar() {
  const currentuser=useSelector(state => state.user)
  const sentuser=useSelector(state => state.selectedchat)
  const textref=useRef()
  const dispatch=useDispatch()
  
const sendmessage=(e)=>{
  let montharr=["January","February","March","April","May","June","July","August","September","October","November","December"]
  e.preventDefault()
  let [month,day,year]=new Date().toLocaleDateString().split('/')
  let datestamp=day+" "+montharr[month-1]+" "+year
  
  let [timesplit,timezone]=new Date().toLocaleTimeString().split(' ')
  let time=timesplit.split(':')
  let timestamp=time[0]+':'+time[1]+' '+timezone
  if(textref.current.value != ""){
    dispatch(actions.SendMessage(currentuser,sentuser,textref.current.value,timestamp,datestamp))
    textref.current.value=''
  }
}

  return (
    <form onSubmit={sendmessage} className='chatinput'>
      <input type='text' ref={textref} autoFocus  placeholder='Type here to send a message...' />
      {/* <input type='file' ><ion-icon name="images-outline"></ion-icon></input> */}
      <div className='items'>
      <label htmlFor='chooseimg'>
      <input type='file' style={{display:'none'}}  id='chooseimg'/>
      <ion-icon name="images-outline"></ion-icon>
      </label>
      <label htmlFor='choosefile'>
      <input type='file' style={{display:'none'}}  id='choosefile'/>
      <ion-icon style={{fontSize:'1.5rem'}} name="document-attach-outline"></ion-icon>
      </label>
      <button type='submit' ><ion-icon name="send-outline"></ion-icon></button>
      </div>
    </form>
  )
}

export default ChatBottomBar
