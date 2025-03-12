import React, { useState } from 'react'
import './Login.css'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../firebase.config'
const Login = () => {
  
  const[currstate, setcurrstate]=useState("Login")  
  
  return (
    <div className='login_out'>
      
      <div className='login_inner'>
        <h2>{currstate}</h2>
        {currstate === "Signup" && (
          <>
            <label htmlFor="username">Enter username</label>
            <br />
            <input type="text" id="username" placeholder="Username" />
            <br />
          </>
        )}
      
      <label htmlFor="">Enter email</label>
      <br />
      <input type="email" />
      <br />
      <label htmlFor="">Enter password</label>
      <br />
      <input type="password" />
      <button>{currstate==="Login"?"Login":"Signup"}
      </button>
      <br />

        <h3>
          {currstate === "Login" ? "Don't have an account?" : "Already have an account?"} 
          <span 
            onClick={() => setcurrstate(currstate === "Login" ? "Signup" : "Login")} 
            className='ca'>
              {currstate === "Login" ? " Create account" : " Login"}
          </span>
        </h3>
    </div>
    </div>
  )
}

export default Login