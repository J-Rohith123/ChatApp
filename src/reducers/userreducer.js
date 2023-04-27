

let stateinit={
  users:[{email:'',name:'',id:'',propic:''}],
  user:{email:'',messages:[],name:'',id:'',propic:''},
  loggedin:false,
  selectedchat:{email:'',name:''}}

const userReducer = (state=stateinit,action)=>{
  switch(action.type){
    case 'getusers': return {...state,users:[...action.payload]}

    case 'adduser': return {...state,users:[...state.users,action.payload],user:action.payload}

    case 'setuser': return{...state,user:{...action.payload},selectedchat:{}}

    case 'setchatuser': return {...state,selectedchat:action.payload}

    case 'msgsent' : return{...state,
                             user:{...state.user,messages:[...state.user.messages,{mid:state.selectedchat.id,type:'sent',datestamp:action.payload.datestamp,timestamp:action.payload.timestamp,value:action.payload.msg,read:false}]},
                             selectedchat:{...state.selectedchat,messages:[...state.selectedchat.messages,{mid:state.user.id,datestamp:action.payload.datestamp,timestamp:action.payload.timestamp,type:'receive',value:action.payload.msg,read:false}]}}

    case 'logout' : return{...state,user:{},selectedchat:{},loggedin:false}

    case 'updatemsgs' : return{...state,selectedchat:{...state.selectedchat,messages:[...state.selectedchat.messages.filter(msg=>!(msg.read==false && msg.mid==state.user.id && msg.type=="sent")),...action.payload]},
                                        user:{...state.user,messages:[...state.user.messages.filter(msg=>!(msg.read==false && msg.mid==state.selectedchat.id && msg.type=="receive")),...action.payloadsen]}}

    default: return state
  }
}

export default userReducer