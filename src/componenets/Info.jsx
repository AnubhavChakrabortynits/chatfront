import React from 'react'
import '../componenets/styles/info.css'
import { NavLink,useNavigate } from 'react-router-dom'
import { toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function Info({room,socket,handleAllUserDisplay}) {
 
 const navigate=useNavigate()

 const logout=()=>{

  try{
     localStorage.clear()
     toast.success("Successfully Logged Out From The Room", { autoClose: 1200 })
     navigate('/')
  }
  catch(e){
    toast.error("Somehting Wen tWrong. Please Try Again",{autoClose: 1200});
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
 