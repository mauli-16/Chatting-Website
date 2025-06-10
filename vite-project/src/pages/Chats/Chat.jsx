import React from 'react'
import Leftpart from './Leftpart'
import Middlepart from './Middlepart'
import Rightpart from './Rightpart'
import './Chat.css'
import { useState } from 'react'

const Chat = () => {
  const[selectedchat, setSelectedChat]=useState(null)
  return (
    <div className='chat'>
      <div className="part">
      <Leftpart onSelectChat={setSelectedChat} selectedchat={selectedchat}/>
      </div>
      <div className="part" ><Middlepart selectedchat={selectedchat}/></div>
      <div className="part"><Rightpart/></div>
      
     
    
    
    
    </div>
  )
}

export default Chat