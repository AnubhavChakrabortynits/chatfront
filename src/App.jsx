import React from 'react'
import {  Routes, Route,useNavigate } from "react-router-dom";
import Landing from './componenets/Landing';
import Signup from './componenets/Signup';
import Login from './componenets/Login';
import Room from './componenets/Room';
import Chat from './componenets/Chat';

export default function App() {


  const navigate=useNavigate()
  const logout=()=>{
    try{
       localStorage.clear()
       alert('Logged Out Succcessfully..')
       navigate('/')
    }
    catch(e){
              console.log(e)
    }
  }
  return (
    <>
   {localStorage.getItem('user') && <div><button className='button' style={{transform:'translateX(-1px) ',padding:'12px',borderBottom:'none',marginLeft:'1px',borderLeft:'none',borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}} onClick={logout}>Logout</button></div>}
     <Routes>
     
     <Route path='/' element={<Landing/>} />
     <Route path='login' element={<Login/>} />
     <Route path='signup' element={<Signup/>} />
     <Route path='room' element={<Room/>} />
     <Route path='chat' element={<Chat location={'usa'}/>} />

     </Routes> 
     </>
    
  )
}
