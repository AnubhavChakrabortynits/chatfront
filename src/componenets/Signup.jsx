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
     if(name.length>15){
      alert('Max Length Of UserName Can Be 15')
      return
     }
     if(password.length<6){
      alert('Password Length Needs To Be Atleast Of 6 Characters')
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
          <div className='signloginbutton' style={{fontWeight:'800'}}  onClick={signup}><span>Signup</span></div> <div className='gotobutton' style={{padding:'10px 15px',fontWeight:'bolder',cursor:'pointer',border:'1px solid white',marginTop:'15px',borderRadius:'12px'}} onClick={()=>{navigate('/login')}}> <span>goto Login</span> </div>
        
        </div>

      </div>
    </div>
  )
}
