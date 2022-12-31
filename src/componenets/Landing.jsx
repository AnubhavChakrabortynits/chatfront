import React,{useEffect} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import './styles/landing.css'

export default function Landing() {
const navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('user')){
     navigate('/room')
    }
  })
  return (
    <div className='landingoutercont'>
    <div className='landingheading'>
      <h1>Just Chat... </h1>
    </div>
    <div className='description'>
     Just Chat Is An Online Chatting Platform Where Users Can Create And Join Rooms And Have A Chat.
     All You Need To Do Is Register And Login To The Platform.After That Either You Can Join An Existing Room If You Have The Room Name And The Room Code Of That Room
     Or You Can Create Your Own Room And Share The Room Name And Code TO Your Friends To Let Them Join Your Room And Have A Chat With You.

     <br/>  <br/> <br/>
     Also Just Chat Has The Feature Of Chat Backup ..So On Page Refresh Or Reload The Chats Wont Get Deleted...
    </div>

    <div className='getstartedbuttoncont' onClick={()=>{navigate('/signup')}}>

   Get Started...
    </div>

       

    </div>
  )
}
