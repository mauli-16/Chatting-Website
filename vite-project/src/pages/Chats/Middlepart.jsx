import React from 'react'
import './Middlepart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
const Middlepart = () => {
  return (
    <>
      <div className='nav-container'>
        <div className="nb">
        <h4 className='name'>Mauli Saxena</h4>
        <p className='bio'> sweet-toothed</p>
        </div>
        <div className="calls">
          <FontAwesomeIcon icon={faPhone} />
          <FontAwesomeIcon icon={faVideo} />
        </div>  
      </div>
    </>
  )
}

export default Middlepart