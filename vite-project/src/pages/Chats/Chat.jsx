import React from 'react'
import Leftpart from './Leftpart'
import Middlepart from './Middlepart'
import Rightpart from './Rightpart'
import './Chat.css'

const Chat = () => {
  return (
    <div className='chat'>
      <div className="part">
      <Leftpart/>
      </div>
      <div className="part"><Middlepart/></div>
      <div className="part"><Rightpart/></div>
      
     
    
    
    
    </div>
  )
}

export default Chat