import React,{useState} from 'react'
import './Profile.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase'
const Profile = () => {
  return (
    <div className='profile-box'>
      <div className="photo-box">
        <label htmlFor="" className='pp'>Enter your profile photo</label>
        <input type="file" className='photo'/>
      </div>
      <div className="bio">
      <label htmlFor="" className='pt'>Enter your bio</label>
      <input type="text" />
      </div>
     
    </div>
  )
}

export default Profile