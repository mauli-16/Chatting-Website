import React from 'react'
import Leftpart from './Leftpart'
import Middlepart from './Middlepart'
import Rightpart from './Rightpart'
import './Chat.css'

const Chat = () => {
  return (
    <div>
      <div className="chat-container">
      <Leftpart/>
      <Middlepart/>
      <Rightpart/>
      </div>
    
    
    
    </div>
  )
}

export default Chat