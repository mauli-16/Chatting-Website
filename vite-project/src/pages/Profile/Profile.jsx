import React,{useState} from 'react'
import './Profile.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase'
const Profile = () => {
  const [file,setFile]=useState(null);
  const [bio,setBio]=useState(null);
  const [uploading,setUploading]=useState(false);
  const[success,setSuccess]=useState(false);

  const handleUpload= async()=>{
    if(!file || !auth.currentUser) return false;
    try{
      setUploading(true)
      const storage=getStorage();
      const fileRef= ref(storage,`profilePictures/${auth.currentUser.uid}`);
      console.log(auth.currentUser.uid);
      await uploadBytes(fileRef,file);
      const photoURL= await getDownloadURL(fileRef)
      await updateProfile(auth.currentUser,{
        photoURL:photoURL,
        displayName:bio|| auth.currentUser.displayName
      });
      setSuccess(true)

    }
    catch(error){
      console.error("Error uploading profile:", error);
    }
    finally{
      setUploading(false)
    }
  }
  

  return (
    <div className='profile-box'>
      <div className="photo-box">
        <label htmlFor="" className='pp'>Enter your profile photo</label>
        <input type="file" className='photo' onChange={(e)=>{setFile(e.target.files[0])}}/>
      </div>
      <div className="bio">
      <label htmlFor="" className='pt'>Enter your bio</label>
      <input type="text" onChange={(e)=>{setBio(e.target.value)}} />
      </div>
      <button onClick={handleUpload} disabled={uploading}>
        {uploading?'Uploading..':'Save profile'}
      </button>
      {success && <p style={{color:'green'}}>Profile updated successfully</p>}
    </div>
  )
}

export default Profile