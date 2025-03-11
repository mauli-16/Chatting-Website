import React from 'react'
import './Signup.css'

const Signup = () => {
  return (
    <div className='login_out'>
      
      <div className='login_inner'>
      <label htmlFor="">Enter username</label>
      <br />
      <input type="text" />
      <br />
      
      <label htmlFor="">Enter email</label>
      <br />
      <input type="email" />
      <br />
      <label htmlFor="">Enter password</label>
      <br />
      <input type="password" />
      <button>Create account</button>
      <br />
      {/* <h3>Dont have an account? <a className='ca'>Create account</a></h3> */}
    </div>
    </div>
  )
}

export default Signup