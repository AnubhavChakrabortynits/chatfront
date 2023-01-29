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
