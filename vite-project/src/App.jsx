import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login/Login'
import Signup from './Signup'
import {Route, Routes} from 'react-router-dom'
import Chat from './pages/Chats/Chat'
import Profile from './pages/Profile/Profile'

function App() {
 

  return (
    <>
  
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>


      </Routes>
    </>
  )
}

export default App
