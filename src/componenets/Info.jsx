import React from 'react'
import '../componenets/styles/info.css'
import { useSearchParams } from 'react-router-dom'

import { NavLink,useNavigate } from 'react-router-dom'
export default function Info({room,socket,handleAllUserDisplay}) {
 const [params]=useSearchParams()
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
    <div className='infobar'>
      <div className='leftinnercont'>
      <i className="fa-solid fa-users" style={{color:'white',fontSize:'20px'}} onClick={handleAllUserDisplay}></i>
        <h3>{room}</h3>
      </div>
      <div className='rightinnercont'>
       <span className='roomleave' onClick={logout}>Logout</span>
       <NavLink to='/room' className='navlink'>
       <i className="fa-solid fa-circle-xmark" ></i></NavLink>
      </div>
    </div>
  )
}
 