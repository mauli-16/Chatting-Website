import React, { useState } from 'react'
import './Login.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from './firebase.config'
const Login = () => {
  
    
  
  return (
    <div className='login_out'>
      
      <div className='login_inner'>
      <label>Enter username</label>
      <br />
      <input type="text" placeholder='Enter username' />
      <br />
      <label htmlFor="">Enter email</label>
      <br />
      <input type="email" />
      <br />
      <label htmlFor="">Enter password</label>
      <br />
      <input type="password" />
    </div>
    </div>
  )
}

export default Login