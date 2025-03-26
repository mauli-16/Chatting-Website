import React from 'react'
import './Leftpart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Leftpart = () => {
  return (

    <div>
      <div className='search-container'>
      <FontAwesomeIcon icon={faMagnifyingGlass}  className='searchicon'/>
      <input type="text"  placeholder='search' className='searchbox'  />
      </div>
      
     
    </div>
  )
}

export default Leftpart