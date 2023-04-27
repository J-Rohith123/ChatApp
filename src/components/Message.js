import React from 'react'
import '../css/Home.css'

function Message(props) {

    if(props.msgtype === 'sent'){
        return (
          <div className='sentcontainer' >
    <div className='sentmessage'>
      {props.value}<sub>{props.read?"✅":"✔️"}</sub>
    </div>
    <p>{props.timestamp}</p>
    </div>
  )
    }else{
        return (
          <div className='receivecontainer' >
            <div className='receivemessage'>
              {props.value}
            </div>
            <p>{props.timestamp}</p>
            </div>
          )
    }
  
}

export default Message
