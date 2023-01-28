import React from 'react'
import {  Routes, Route} from "react-router-dom";
import Landing from './componenets/Landing';
import Signup from './componenets/Signup';
import Login from './componenets/Login';
import Room from './componenets/Room';
import Chat from './componenets/Chat';
import './componenets/styles/all.css'

export default function App() {

  return (
    <>
    {localStorage.getItem('user') &&     <div style={{color:'white',fontSize:'28px',fontWeight:'800',textAlign:'center',marginBottom:'35px',textShadow:'2px 2px 1px rgb(221, 20, 114)',textDecoration:'underline'}}><span>JUST CHAT...</span></div>}
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
