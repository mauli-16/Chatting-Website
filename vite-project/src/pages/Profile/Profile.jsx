import React, { useState } from 'react'
import { auth, storage,db } from '../../firebase.config';
import './Profile.css';
import { updateDoc, doc, setDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";


const Profile = () => {
  const user=auth.currentUser
  const[bio,setbio]=useState("");
  const[photo,setphoto]=useState(null);
  const[loading,setloading]=useState(false);
  const handleupload=async()=>{
    if(!user || !photo) return;
    setloading(true);
    try{
      //uploading pic to firstore
      const photoRef = ref(storage, `profilePhotos/${user.uid}`);
      await uploadBytes(photoRef,photo);
      //get dnd url
      const photoURL=await getDownloadURL(photoRef);
      //update profile in firestore
      await updateDoc(doc(db,"users",user.uid),{
        bio:bio,
        photoURL:photoURL

      })
      console.log('profile updated!'
      )
    }
    catch(error){
      console.log(error);
    }
    setloading(false);
  };

  return (
    <>
    <div className="profile-box">
      <label className="pp">Enter profile photo</label>
    <input type="file" onChange={(e)=>setphoto(e.target.files[0])}/>
    <label >Enter bio</label>
    <input type="text" onChange={(e)=>setbio(e.target.value)} />
    </div>
    <button onClick={handleupload}>{loading?"Updating..":"Update Profile"}</button>
    
    </>
  )
}

export default Profile
