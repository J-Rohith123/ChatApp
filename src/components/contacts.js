import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/Home.css'
import * as actions from '../actions/actions'
import Cookies from 'js-cookie'

function Contacts() {
   const users=useSelector(state => state? state.users:[])
   const currentuser=useSelector(state =>state? state.user:{})
   const dispatch=useDispatch()
  const [displayusers,setdisplayusers]=useState([...users])
  useMemo(()=>{
   setdisplayusers([...users])
   console.log("hello")
  },[currentuser.messages])
  //  const [users,setusers]=useState([{ id:1,name:'Rohith',number:999999999,pic:'pic.png' },{ id:2,name:'Rohith',number:999999999,pic:'pic.png' }])
  const sortusers=(a,b)=>{

    const getdata=([time,zone],[date,month,year])=>{
      let months=["January","February","March","April","May","June","July","August","September","October","November","December"]
      let [hours,mins]=time.split(":")
      
      if(zone=="PM" && hours!='12'){
        hours=hours-0+12
      }
      if(zone=="AM" && hours=='12'){
        hours=0
      }
      return [date-0,months.indexOf(month),year-0,hours-0,mins-0]
    }

    let [adate,amonth,ayear,ahours,amins]=getdata(a.messages[a.messages.length-1].timestamp.split(" "),a.messages[a.messages.length-1].datestamp.split(" "))
    let [bdate,bmonth,byear,bhours,bmins]=getdata(b.messages[b.messages.length-1].timestamp.split(" "),b.messages[b.messages.length-1].datestamp.split(" "))
   
    const afulldate=new Date(ayear,amonth,adate,ahours,amins,0,0)
    const bfulldate=new Date(byear,bmonth,bdate,bhours,bmins,0,0)
    console.log(Number(afulldate),Number(bfulldate))
    // if(!(afulldate.getFullYear()==bfulldate.getFullYear())){
    //    return bfulldate.getFullYear()-afulldate.getFullYear()
    // }else if(!(afulldate.getMonth()==bfulldate.getMonth())){
    //   return bfulldate.getMonth()-afulldate.getMonth()
    // }else if(!(afulldate.getDate()==bfulldate.getDate())){
    //   return bfulldate.getDate()-afulldate.getDate()
    // }else{
    //   return bfulldate.getTime()-afulldate.getTime()
    // }
    return Number(bfulldate)-Number(afulldate)

  }
  const setchatuser=(id)=>{
    dispatch(actions.setChatUser(id))
    Cookies.set('chatuser',id)
  }

  const Recentmsg=(props)=>{
   let msgs=0
   let types=0
   currentuser.messages?.map(msg =>{
    if(msg.mid == props.id) {
      msgs=msg.value
      types=msg.type
    }
   })
     if(types=="sent"){
      return "You: "+msgs
     }
     if(msgs==0) return "Hey! I am using Chat App..."
   return msgs
  }
const searchuser=(username)=>{
  let tempusers=[...users]
  tempusers=tempusers.filter(user=>{
    if(username === '') return user
        else if(user.name.toLowerCase().includes(username.toLowerCase())) return user
  })
  setdisplayusers([...tempusers])
  
}
  const Unreadno=(props)=>{
    let count=0
    currentuser.messages?.map(msg =>{
      if(msg.mid == props.id) {
        if(msg.read==false & msg.type=='receive') count++
      }
     })
     if(count!=0) return <span id='unreadno'>{count}</span>
  }
  return (
    <div className='contacts'>
    <div className='searchcontainer'>
      <input type='text' id='search' placeholder='Find a user...' onChange={e=>searchuser(e.target.value)}></input>
      </div>
      <div className='contactlist'>
        {
          displayusers.sort((a,b)=>sortusers(a,b)).map(user =>(
            (user.id != currentuser.id)?
            <div className='contactitem' key={user.id} onClick={()=>setchatuser(user.id)} >
            <img src={user.propic}></img>
            <div className='namemsg'>
              <span id='name' >{user.name}</span>
              <span id='msg' >{<Recentmsg id={user.id}  />}</span>
            </div>
            <Unreadno id={user.id}/>
            </div>:null
          ))
        }
      </div>

    </div>
  )
}

export default Contacts
