import React from 'react'
import { useEffect, useState } from 'react';
import { db, auth } from '../../firebase.config';
import { collection,query,where, onSnapshot, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import './Leftpart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Leftpart = () => {
  
    const [chatList, setChatList]=useState([]);
   
 

useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      

      const q = query(
        collection(db, "chats"),
        where("members", "array-contains", uid),
        orderBy("updatedAt", "desc")
      );

      const unsubscribeChats = onSnapshot(q, (snapshot) => {
        const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Chats:", chats);
        setChatList(chats);
      });

      
      return () => unsubscribeChats();
    }
  });

  return () => unsubscribeAuth(); 
}, []);
     
  


  return (
    <>
    
    <div className='left-panel'>
      <div className='search-container'>
      <FontAwesomeIcon icon={faMagnifyingGlass}  className='searchicon'/>
      <input type="text"  placeholder='search' className='searchbox'  />
      </div>
      
      <div>{chatList.map(chat=>(<div key={chat.id} className='chat1'>
        <p>{chat.id}</p>
        <p>{chat.lastMessage || 'No messages yet'}</p>
      </div>))}</div>
      
    
    </div>
   
    </>
  )
}

export default Leftpart