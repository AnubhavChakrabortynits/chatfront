import React from 'react'
import '../componenets/styles/info.css'
import { useSearchParams } from 'react-router-dom'

import { NavLink } from 'react-router-dom'
export default function Info({room,socket,handleAllUserDisplay}) {
 const [params]=useSearchParams()

  return (
    <div className='infobar'>
      <div className='leftinnercont'>
      <i className="fa-solid fa-globe" onClick={handleAllUserDisplay}></i>
        <h3>{room}</h3>
      </div>
      <div className='rightinnercont'>
       <span className='roomleave'>Take a Break?</span>
       <NavLink to='/room' className='navlink'>
       <i className="fa-solid fa-circle-xmark" ></i></NavLink>
      </div>
    </div>
  )
}
 