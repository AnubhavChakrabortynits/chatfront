import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import './styles/signup.css'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export default function Signup() {

  const [name,setName]=useState('')
  const [password,setPassword]=useState('')

    const navigate=useNavigate()
  const signup=async()=>{

     if(!name || !password){
      toast.warning("Please fill In All the Details",{autoClose: 1200})
         return
     }
     if(name.length>15){
      toast.info("Maximum Length Of Name Can Be Of 15 Characters",{autoClose: 1200})
      return
     }
     if(password.length<6){
      toast.info("Password Needs To Be Of At Least 6 Characters",{autoClose: 1200})
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
    toast.success("Signed Up succesfully",{autoClose: 1200})
        navigate('/login')
  }
  else{
   toast.error(`${jdata.error}`,{autoClose: 1200})
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
          <input type='text' value={name} placeholder="Enter Your Username" onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className='inputpass'>
          <label>Password:</label>
          <input type='password' value={password} placeholder="Enter Your Password" onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div className='buttonsignupcont'>
          <div className='signloginbutton' style={{fontWeight:'800'}}  onClick={signup}><span>Signup</span></div> <div className='gotobutton' style={{padding:'10px 15px',fontWeight:'bolder',cursor:'pointer',border:'1px solid white',marginTop:'15px',borderRadius:'12px'}} onClick={()=>{navigate('/login')}}> <span>goto Login</span> </div>
        
        </div>

      </div>
    </div>
  )
}
