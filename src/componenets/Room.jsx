import React from 'react'
import { useState,useEffect } from 'react'
import './styles/room.css';
import { useNavigate } from 'react-router-dom';
export default function Room() {
 
  const navigate=useNavigate()
  const [name,setName]=useState('')
  const [room,setRoom]=useState('')
  const [roompass,setRoompass]=useState('')

  const [croom,setcRoom]=useState('')
  const [croompass,setcroomPass]=useState('')


const handlenavigatejoin=async()=>{
  if( !room ||!roompass){
    alert('Fill In All The Details')
    return
  }

  const data=await fetch(`http://localhost:5000/join`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    
    body: JSON.stringify({name:name,room,roompass,user:JSON.parse(localStorage.getItem('user'))})
  })
  const jdata=await data.json()
  console.log(JSON.parse(localStorage.getItem('user')))
  console.log(jdata)
  if(jdata.success){
    navigate(`/chat?name=${name}&room=${room}`,{state:{roomobj:jdata.room,userobj:name}})
  }
  else{
    alert(jdata.error)
  }
}


const handleNavigateCreate=async()=>{
  if( !croom ||!croompass){
    alert('Fill In All The Details')
    return
  }
     if(croom.length>12){
      alert('Max Length Of Room Can Be 12')
      return
     }

     if(croompass.length<6){
      alert('Room Password Needs To Be Of Atleast 6 Characters')
      return
     }
  const data=await fetch(`http://localhost:5000/create`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({name:name,room:croom,roompass:croompass,user:JSON.parse(localStorage.getItem('user'))})
  })
  const jdata=await data.json()

  if(jdata.success){
    navigate(`/chat?name=${name}&room=${croom}&roompass=${croompass}}`,{state:{roomobj:jdata.room,userobj:name}})
  }
  else{
    alert(jdata.error)
  }
}

const handleOnRoomPage=async()=>{
  const data=await fetch(`http://localhost:5000/onroompage`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({user:JSON.parse(localStorage.getItem('user')),room:croom,roompass:croompass})
  })
  const jdata=await data.json()

  if(jdata.user){
      setName(jdata.user.user)
  }
  else{
    navigate('/login')
  }
}


useEffect(()=>{
  if(!(localStorage.getItem('user'))){
    navigate('/login')
  }
  else{
    handleOnRoomPage()
  }
  
})
  return (
    <div className='roomCont'>
      <div className='joinInCont'>
        <div className='heading' style={{fontSize:"20px"}}>Join / Create Room</div>
        <div className='inputbox' style={{display:'flex',justifyContent:"space-evenly",alignItems:'center',padding:'10px'}}>
        <div className='joincreate' style={{display:'flex',justifyContent:"space-evenly",alignItems:'center',padding:'10px',flexDirection:"column"}}>
         
          <div className='innerjoincreate'>
          <label>Room Name:</label>
          <input className='joinInput' type='text' onChange={(e)=>{setRoom(e.target.value)}}/>
          </div>
          <div className='innerjoincreate'>
          <label>Room Code:</label>
          <input className='joinInput' type='text' onChange={(e)=>{setRoompass(e.target.value)}}/>
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
          <input className='joinInput' value={croom} type='text' onChange={(e)=>{setcRoom(e.target.value)}}/>
          </div>
          <div className='innerjoincreate'>
          <label>Room Code:</label>
          <input className='joinInput' value={croompass} type='text' onChange={(e)=>{setcroomPass(e.target.value)}}/>
          </div>
          <div className='buttoncont'>
          <button type="submit" className='button' onClick={handleNavigateCreate}>Create</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
