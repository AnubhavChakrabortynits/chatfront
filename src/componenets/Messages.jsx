import React, { useEffect } from 'react'
import Message from './Message'
import '../componenets/styles/messages.css'
import { css } from '@emotion/react'

export default function Messages({messages,currentuser}) {

  const ROOT_CSS = css({
    height: 600,
    width: 400 ,
    backgroundColor:'red'
  });


  return (
    <div className='scroll'>
   
   {messages?.map((item,index)=>{
    return <div key={index}>
        <Message  message={item} currentuser={currentuser}/>
    </div>
   })}
  
    </div>
   
  )
}
