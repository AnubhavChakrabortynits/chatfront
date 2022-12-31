import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import './styles/signup.css'
export default function Login() {

  const [name,setName]=useState('')
  const [password,setPassword]=useState('')

    const navigate=useNavigate()
  const login=async()=>{

     if(!name || !password){
         alert('Please Fill In All The Details')
         return
     }
  const data=await fetch(`http://localhost:5000/login`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
 
    body: JSON.stringify({name,password})
  })
  const jdata=await data.json()

  if(jdata.success){
    localStorage.setItem('user',JSON.stringify(jdata.user))
    alert('Logged In Successfully')
    navigate('/room')
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
          <h7 style={{color:'white',textDecoration:'underline'}}>Login Page..</h7>
        </div>
        <div className='inputname'>
          <label>Name:</label>
          <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className='inputpass'>
          <label>Password:</label>
          <input type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div className='buttonsignupcont'>
        <button className='button' style={{fontWeight:'800'}}  onClick={login}>Login</button> <button style={{padding:'5px 15px',backgroundColor:'black',color:'white',fontWeight:'bolder',cursor:'pointer',boxShadow:'1px 1px 1px white'}} onClick={()=>{navigate('/signup')}}> goto Signup</button>
        </div>
      </div>
    </div>
  )
}
