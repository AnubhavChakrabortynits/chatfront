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
    <h2 style={{color:"#ff7793"}}>What is Just Chat ?</h2>
     <h4>Just Chat is a chat application with chat backup that allows users to join or create room and have a chat
     with their mates... </h4>
    </div>

    <div className='getstartedbuttoncont' onClick={()=>{navigate('/signup')}}>Get Started... </div>
    </div>
  )
}
