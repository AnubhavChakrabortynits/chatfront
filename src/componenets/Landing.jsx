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
    <h2 style={{color:"yellow"}}>What is Just Chat?</h2>
    <h4>Just Chat Is An Online Chatting Platform Where Users Can Create And Join Rooms And Have A Chat.
     All You Need To Do Is Register And Login To The Platform.After That Either You Can Join An Existing Room If You Have The Room Name And The Room Code Of That Room
     Or You Can Create Your Own Room And Share The Room Name And Code TO Your Friends To Let Them Join Your Room And Have A Chat With You.
     <br/><br/><div style={{color:"rgb(221, 20, 110)"}}> Also Just Chat Has The Feature Of Chat Backup ..So On Page Refresh Or Reload The Chats Wont Get Deleted...</div>
    </h4> 
     <br/>

     <h2 style={{color:'yellow'}}>How To Use Just Chat?</h2>
     <ul>
      <li>Hit The Get Started Button. It Will Lead You To The Signup Page</li>
      <li>SignUp With a username and a password. If You Already a User The click goto Login Button To Go The Login Page.</li>
      <li>Login With The Username And The Password With Which You Signed Up...</li>
      <li>After That You Get To The Room Page Where You Can Either Create a Room And Share The Room Name And Room Code With Your Friend If Want Them To Join The Room, Or You Can Join An Existing Room</li>
      <li>That's it, You Now Can Use Just Chat...</li>
     </ul>
       
     <br/><br/>

     <h2 style={{color:'yellow'}}>Admin Features...</h2>
     <ul>
      <li>Admin Of Any Room Has The Feature To Remove Someone From The Room. However, The Removed User Can Join the Room Again.</li>
      <li>Admin Has Also Got The Feature Of Banning A User. In This Case The Banned User Won't Be Able To Join The Room Again.</li>
      <li>Admin Also Has The Feature Of Deleting And Entire Room.</li>
     </ul>
    </div>

    <div className='getstartedbuttoncont' onClick={()=>{navigate('/signup')}}>

   Get Started...
    </div>

       

    </div>
  )
}
