import React from 'react'
import './Leftpart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Leftpart = () => {
  return (

    <div className='left-panel'>
      <div className='search-container'>
      <FontAwesomeIcon icon={faMagnifyingGlass}  className='searchicon'/>
      <input type="text"  placeholder='search' className='searchbox'  />
      </div>
      
      <div className='chat-container'>
      {Array.from({ length: 10 }).map((_, index) => (
    <div className="chat1" key={index}>hello</div>
  ))}

      </div>
    </div>
  )
}

export default Leftpart