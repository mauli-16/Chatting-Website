import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase.config';
import { db } from '../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './Rightpart.css';

const Rightpart = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No user data found in Firestore.");
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div>
      <div className="circle"></div>
      <div className="profile">
        <img
          className="circle"
          src={user?.photoURL || 'default-profile.png'}
          alt="Profile"
        />
        <div className="name">{userData?.username || "Unknown User"}</div>
        <div className="bio">{user?.displayName || "No bio provided"}</div>
      </div>
      <div className="media">Media</div>
      <button className='logout'>Logout</button>
    </div>
  );
};

export default Rightpart;
