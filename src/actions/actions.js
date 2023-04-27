import axios from "axios"
import Cookies from "js-cookie"


export const getUsers=()=>{
  return (dispatch)=>{
    axios.get('http://localhost:8000/users')
    .then(data=>{
      dispatch({type:'getusers',payload:data.data})
    })
   
  }
}

export const addUser=(val)=>{
    return (dispatch)=>{
      axios.post('http://localhost:8000/users',val).catch(err => console.log(err))
      dispatch({type:'adduser',payload:val})
    }
}
export const setUser=(val)=>{
  let pathLink="http://localhost:8000/users/"+''+val
    return(dispatch)=>{
        axios.get(pathLink)
        .then(res => dispatch({type:"setuser",payload:res.data}) )
        .catch(err => console.log("Error:"+err))
    }
  
}
export const setChatUser=(val)=>{
  let pathLink="http://localhost:8000/users/"+''+val
    return(dispatch)=>{
        axios.get(pathLink)
        .then(res => dispatch({type:"setchatuser",payload:res.data}) )
        .catch(err => console.log("Error:"+err))
    }
}
export const SendMessage=(sender,receiver,message,timestamp,datestamp)=>{
    let sentpathlink="http://localhost:8000/users/"+''+sender.id
    let receiverlink="http://localhost:8000/users/"+''+receiver.id
    return(dispatch)=>{
         axios.put(sentpathlink,{...sender,messages:[...sender.messages,{mid:receiver.id,datestamp:datestamp,timestamp:timestamp,type:'sent',value:message,read:false}]})
         
         axios.put(receiverlink,{...receiver,messages:[...receiver.messages,{mid:sender.id,datestamp:datestamp,timestamp:timestamp,type:'receive',value:message,read:false}]})
         .then(res => dispatch({type:'msgsent',payload:{msg:message,timestamp:timestamp,datestamp:datestamp}}))
    }
}
export const Logout=()=>{
  Cookies.remove('currentuser')
  Cookies.remove('chatuser')
  return (dispatch) =>{
    dispatch({type:'logout'})
  }
}

export const setread=(sender,receiver,uptmsgsrec,uptmsgssen)=>{
  let sentpathlink="http://localhost:8000/users/"+''+sender.id
    let receiverlink="http://localhost:8000/users/"+''+receiver.id
    return (dispatch)=>{
      axios.put(sentpathlink,{...sender,messages:[...sender.messages.filter(msg=> !(msg.read==false && msg.mid==receiver.id && msg.type=="receive") ),...uptmsgssen]})
      axios.put(receiverlink,{...receiver,messages:[...receiver.messages.filter(msg=> !(msg.read==false && msg.mid==sender.id && msg.type=="sent") ),...uptmsgsrec]})
      .then(res => dispatch({type:'updatemsgs',payload:uptmsgsrec,payloadsen:uptmsgssen}))
    }
}