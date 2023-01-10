import React from 'react'
import { useState,useEffect,useRef } from 'react';
import { useSearchParams,useNavigate,useLocation } from 'react-router-dom';
import io from 'socket.io-client'
import Info from './Info';
import Input from './Input';
import Messages from './Messages';
import '../componenets/styles/chat.css'



let socket;
export default function Chat({route}) {

const [params]=useSearchParams()
const navigate=useNavigate()
const location=useLocation()

const getUsersInARoom=async()=>{
  const data=await fetch(`http://localhost:5000/getuinaroom`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({room:room})
  })
  const jdata=await data.json()

  setUsers(jdata.users)
}
const handleInitialJoin=async()=>{
  const data=await fetch(`http://localhost:5000/initialjoin`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({name,room,roompass})
  })
  const jdata=await data.json()
    jdata.chats.push({name:params.get('name'),type:'userjoined',room:params.get('room')})
  setMesgs(jdata.chats)


}

const handleAllUserDisplay=()=>{
if(ref.current.classList.contains('display')){
 ref.current.classList.remove('display')
}
else{
  ref.current.classList.add('display')
}
}

const deleteRoom=async(socket)=>{
  
  const ans=confirm('Are U Sure U Want To Delete This Room')
  if(!ans){
   return
  }
  const data=await fetch(`http://localhost:5000/deleteroom`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({room:room})
  })
  const jdata=await data.json()
  if(jdata.success){
    setRoom('')
    socket.emit('mesg',{name,room,mesg:'Room Deleted'})
  
    navigate('/room')
  }
  else{
    alert('Room Could Not Be Deleted')
  }
}


const removeUser=async(username)=>{

  const ans=confirm('Are U Sure U Want To Remove This User')
  if(!ans){
   return
  }
  const data=await fetch(`http://localhost:5000/removeuser`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({name:username,room:params.get('room')})
  })
  const jdata=await data.json()

  if(jdata.success){
    socket.emit('mesg',{name:username,room,mesg:'User Removed'})
    return
  }
  else{
    alert('User Could Not Be Removed')
  }
}

const banUser=async(username)=>{
  const ans=confirm('Are U Sure U Want To Ban This User')
  if(!ans){
   return
  }
  const data=await fetch(`http://localhost:5000/banuser`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({name:username,room:params.get('room')})
  })
  const jdata=await data.json()

  if(jdata.success){
    socket.emit('mesg',{name:username,room,mesg:'User Banned'})
    return
  }
  else{
    alert('User Could Not Be Banned')
  }
}

const leaveRoom=async(username)=>{
   const ans=confirm('Are U Sure U Want To Leave The Room')
   if(!ans){
    return
   }
  const data=await fetch(`http://localhost:5000/removeuser`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({name:username,room:params.get('room')})
  })
  const jdata=await data.json()

  if(jdata.success){
    socket.emit('mesg',{name:username,room,mesg:'User Left'})
    return
  }
  else{
    alert('User Could Not Be Removed')
  }
}

const ref=useRef()
const [name,setName]=useState(params.get('name'))
const [users,setUsers]=useState(()=>location.state.roomobj.people)
const [room,setRoom]=useState(params.get('room'))
const [roompass,setRoompass]=useState(params.get('roompass'))
const [mesg,setMesg]=useState('')
const [mesgs,setMesgs]=useState([])
    useEffect(()=>{
      
      if(!(localStorage.getItem('user'))){
        navigate('/login')
        return
      }
      if(JSON.parse(localStorage.getItem('user')).name!=(params.get('name'))){
        navigate('/login')
      }
      handleInitialJoin()
      
     socket=io( `localhost:5000`,{transports: ['websocket']}) 
     getUsersInARoom()  
     setRoom(params.get('room'))
     setName(params.get('name'))
     setRoompass(params.get('roompass'))
     socket.emit('join',{name,room,roompass})
        console.log(socket)

  
      socket.on('mesg',(data)=>{
        if(data.type=='roomdeleted'){
          alert('Room Has Been Deleted By The Admin')
          navigate('/room')
          return
        }
        if(data.type=='userjoined'){
          getUsersInARoom()
          
        }

        if(data.type=='userremoved'){
          getUsersInARoom()
          if(data.name==params.get('name')){
            alert('You Have Been Removed By The Room Admin')
            navigate('/room')
          }
        }
        if(data.type=='userbanned'){
          getUsersInARoom()
          if(data.name==params.get('name')){
            alert('You Have Been Banned By The Room Admin')
            navigate('/room')
          }
        }

        if(data.type=='userleft'){
          getUsersInARoom()
          if(data.name==params.get('name')){
            alert('You Have Left The Room')
            navigate('/room')
          }
        }
        setMesgs((mesgs)=>[...mesgs,data])
        console.log(data)
        })
        return ()=>{
            socket.disconnect();
            socket.off();
        }
    },[name,room])

    //console.log('people are  ',users)

    const sendMesg=()=>{
      if(mesg){
        
        socket.emit('mesg',{name,room,mesg})
       
        setMesg('')
     
      }
    }
  // console.log(mesgs)
  return (
    <div className='chatoutcont' style={{color:"red"}}>
    
    <div ref={ref} className='users display'>
    <div className='' style={{height:"100px",justifyContent:'center',display:'flex',backgroundColor:'antiquewhite',fontWeight:'800',fontSize:'24px',zIndex:'2'}} key={-1}><span style={{margin:'auto'}}>Users In The Room...</span> </div>
       {users.map((item,i)=>{
       
        return <div key={i} className='userrow'> 
        <div className='usericon '>
        <i className="fa-solid fa-user"></i>
        </div>
        <div className='username'>
             {item.name}
        </div>
        
        {params.get('name')==(location.state.roomobj.admin) && (item.name!=location.state.roomobj.admin)?<div className='rmuser' onClick={()=>{removeUser(item.name)}}>Remove <i className="fa-solid fa-trash"></i></div>:(item.name==location.state.roomobj.admin ?<div className='rmuser'>Admin</div>:<div className='rmuser'></div>)}
        {params.get('name')==(location.state.roomobj.admin) && (item.name!=location.state.roomobj.admin)?<div className='rmuser'  onClick={()=>{banUser(item.name)}}>Ban User <i class="fa-solid fa-ban"></i></div>:<div className=''></div>}
        {location.state.roomobj.admin==(params.get('name')) && params.get('name')==(item.name)?<div className='rmuser' onClick={()=>{deleteRoom(socket);}}>Delete Room<i class="fa-solid fa-right-from-bracket"></i></div>:(params.get('name')==(item.name))?<div className='rmuser'  onClick={()=>{leaveRoom(item.name)}}>Leave Room<i className="fa-solid fa-right-from-bracket"></i></div>:<div></div>}
        
        </div>
       })}
    </div>
    <Info room={room} socket={socket} handleAllUserDisplay={handleAllUserDisplay}/>
      <div className='container'>
    
      
      <Messages messages={mesgs}   />

      </div>
      <div className='inputcont'>
      <Input className='input' message={mesg} setMessage={setMesg} sendMessage={sendMesg} />
      </div>
    </div>
  )
}
