import React from 'react'
import '../componenets/styles/input.css'


export default function Input({message,setMessage,sendMessage}) {
  
  return (
    <div className='inputdiv'>
   
   <textarea placeholder='Type Your Message...' type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} />
   <button className='sendbutton' onClick={sendMessage}>Send</button>
    </div>
  )
}
