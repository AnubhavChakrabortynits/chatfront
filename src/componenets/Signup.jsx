import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import './styles/signup.css'
export default function Signup() {

  const [name,setName]=useState('')
  const [password,setPassword]=useState('')

    const navigate=useNavigate()
  const signup=async()=>{

     if(!name || !password){
         alert('Please Fill In All The Details')
         return
     }
  const data=await fetch(`http://localhost:5000/signup`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({name,password})
  })
  const jdata=await data.json()

  if(jdata.success){
    alert('Logged In Successfully')
        navigate('/login')
  }
  else{
    alert(jdata.error)
  }

  }



  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/room')
    }
  })
  return (
    <div className='signupcont'>
      <div className='signupheading'>
           <h3>Just Chat </h3>
      </div>
      <div className='inputsignupcont'>
      <div className='inputname' >
          <h7 style={{color:'white',textDecoration:'underline'}}>Signup Page..</h7>
        </div>
        <div className='inputname' >
          <label>Name:</label>
          <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className='inputpass'>
          <label>Password:</label>
          <input type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div className='buttonsignupcont'>
          <button className='button' style={{fontWeight:'800'}}  onClick={signup}>Signup</button> <button style={{padding:'5px 15px',backgroundColor:'black',color:'white',fontWeight:'bolder',cursor:'pointer',boxShadow:'1px 1px 1px white'}} onClick={()=>{navigate('/login')}}> goto Login</button>
        
        </div>

      </div>
    </div>
  )
}
