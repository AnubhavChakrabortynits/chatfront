import React, { useEffect,useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRef } from 'react'
import '../componenets/styles/message.css'
export default function Message({message}) {
    const [params]=useSearchParams()
   const mymessage=useState(message)
    let iscurrentuser=false
    let name=message.name

    const scroll=useRef(null)
const scrollbottom=()=>{
    scroll.current.scrollIntoView({behavior: 'smooth'})
}

    if(name==params.get('name')){
        iscurrentuser=true
    }
    else{
        iscurrentuser=false
    }
    useEffect(()=>{
        scrollbottom()
    },[mymessage])
  return (
    <div  className='outerbox' style={{marginTop:"15px"}}>{iscurrentuser==true?<div ref={scroll} className='messagecont end'>
<span className='username' style={{margin:'auto'}}>~ {message.name==params.get('name')?'You':message.name}</span>
<pre className='messagebox bgblue'>
   <span>
       {message.type=='userjoined'?(String((message.name==params.get('name')?'You ':message.name))+`joined room --${message.room}`):message.mesg}
       </span>  
</pre>
    </div>
    : 
    <div ref={scroll} className='messagecont start'>
<span className='username' style={{margin:'auto'}}>~ {message.name}</span>
<pre className='messagebox bgwhite'>
 <span>
       {message.mesg}
       </span>  
</pre>
    </div>}</div>
  )
}
