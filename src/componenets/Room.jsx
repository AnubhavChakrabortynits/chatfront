import React from 'react'
import { useState,useEffect } from 'react'
import './styles/room.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Room() {
 
   const navigate=useNavigate()
  const [name,setName]=useState('')
  const [room,setRoom]=useState('')
  const [roompass,setRoompass]=useState('')

  const [croom,setcRoom]=useState('')
  const [croompass,setcroomPass]=useState('')


const handlenavigatejoin=async()=>{
  if( !room ||!roompass){
    toast.warning("Please fill In All the Details",{autoClose: 1200})
    return
  }

  const data=await fetch(`http://localhost:5000/join`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({name:name,room,roompass,user:localStorage.getItem('user')})
  })
  const jdata=await data.json()
  console.log(jdata)
  if(jdata.success){
    navigate(`/chat`,{state:{roomobj:jdata.room,userobj:name}})
    toast.success("Entered Chatroom Successfully",{autoClose: 1200})
  }
  else{
    toast.error("SomeThing Went Wrong.. Could Not join Room...",{autoClose: 1200})
  }
}


const handleNavigateCreate=async()=>{
  if( !croom ||!croompass){
    toast.warning("Please fill In All the Details",{autoClose: 1200})
    return
  }
     if(croom.length>10){
      toast.info("Maximum Length Of Name Can Be Of 12 Characters",{autoClose: 1200})
      return
     }

     if(croompass.length<6){
      toast.info("room Password Needs To Be Of Atleast 6 characters",{autoClose: 1200})
      return
     }
  const data=await fetch(`http://localhost:5000/create`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({name:name,room:croom,roompass:croompass,user:localStorage.getItem('user')})
  })
  const jdata=await data.json()

  if(jdata.success){
    toast.success("Created And Entered Chatroom Successfully",{autoClose: 1200})
    navigate(`/chat`,{state:{roomobj:jdata.room,userobj:name}})
  }
  else{
    toast.error(`${jdata.error}`,{autoClose: 1200})
  }
}

const onRoomPage=async()=>{

  const data=await fetch(`http://localhost:5000/onroompage`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({user:localStorage.getItem('user')})
  })
  const jdata=await data.json()
  if(jdata.success){
    setName(jdata.user.user)
  }
  else{
    toast.error(`${jdata.error}`,{autoClose: 1200})
    navigate('/login')
    localStorage.clear()
  }
}

const logout=()=>{
  try{
     localStorage.clear()
     toast.error("Logged Out Succesfully",{autoClose: 1200})
     navigate('/')
  }
  catch(e){
    toast.error("Something Went Wrong. Could Not Logout",{autoClose: 1200})
  }
}


useEffect(()=>{
  if(!(localStorage.getItem('user'))){
    navigate('/login')
  }
  else{
   onRoomPage()
  }
  
},[])

  return (
    <>
      {localStorage.getItem('user') && <div><button className='button logout' style={{transform:'translateX(-1px) ',padding:'12px',borderBottom:'none',marginLeft:'1px',borderLeft:'none',borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}} onClick={logout}>Logout</button></div>}
    <div className='roomCont'>
      <div className='joinInCont'>
        <div className='heading' style={{fontSize:"20px"}}>Join / Create Room</div>
        <div className='inputbox' style={{display:'flex',justifyContent:"space-evenly",alignItems:'center',padding:'10px'}}>
        <div className='joincreate' style={{display:'flex',justifyContent:"space-evenly",alignItems:'center',padding:'10px',flexDirection:"column"}}>
          <div className='innerjoincreate'>
          <label>Room Name:</label>
          <input className='joinInput'placeholder='Enter Room name' type='text' onChange={(e)=>{setRoom(e.target.value)}}/>
          </div>
          <div className='innerjoincreate'>
          <label>Room Code:</label>
          <input className='joinInput'placeholder='Enter Room code' type='password' onChange={(e)=>{setRoompass(e.target.value)}}/>
          </div>
          <div className='buttoncont'>
          <div >
            <button type="submit" className='button' onClick={handlenavigatejoin}>Join</button>
          </div>
          </div>
          </div> 
        <div className='joincreate' style={{display:'flex',justifyContent:"space-evenly",alignItems:'center',padding:'10px',flexDirection:"column"}}>
        
          <div className='innerjoincreate'>
          <label>Room Name:</label>
          <input className='joinInput'placeholder='Enter Room name'  value={croom} type='text' onChange={(e)=>{setcRoom(e.target.value)}}/>
          </div>
          <div className='innerjoincreate'>
          <label>Room Code:</label>
          <input className='joinInput'placeholder='Enter Room code'  value={croompass} type='password' onChange={(e)=>{setcroomPass(e.target.value)}}/>
          </div>
          <div className='buttoncont'>
          <button type="submit" className='button' onClick={handleNavigateCreate}>Create</button>
          </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
