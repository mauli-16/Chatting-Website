import React from 'react'
import { useState } from 'react';
import './Middlepart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { db } from '../../firebase.config';
import { collection, addDoc, serverTimestamp,onSnapshot,query,orderBy } from 'firebase/firestore';
import { faPhone, faVideo, faPaperclip, faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Middlepart = () => {
  const [messageText, setMessageText] = useState("");
  const createChat = async (user1, user2, messageText) => {
  try {
    // Step 1: Create a new chat document with metadata (or skip if you already have it)
    const chatsRef = collection(db, "chats");
    const chatDoc = await addDoc(chatsRef, {
      user1: user1,
      user2: user2,
      createdAt: serverTimestamp(),
    });

    // Step 2: Add the message in a subcollection
    const messagesRef = collection(db, "chats", chatDoc.id, "messages");
    await addDoc(messagesRef, {
      sender: user1,
      text: messageText,
      timestamp: serverTimestamp(),
    });

    console.log("Chat and message created!");
    return chatDoc.id;
  } catch (err) {
    console.error("Error creating chat:", err);
  }
};
  const handleMsg=async()=>{
    const user1="GmWjEW3CRWfUIc0RZAFryYASbeT2";
    const user2="eWY3ucgmuyWW16jCQaCc0tuqiph1";
    if(!messageText.trim())return;
    await createChat(user1,user2, messageText);
    setMessageText("");
  }
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
      <div className="msg-container">
        <div className="msg-content">
        <input className='actual-msg' type="text" 
        placeholder='Write a message'value={messageText} onChange={(e)=>setMessageText(e.target.value)}/>
        </div>
        
        <div className="attach">
        <FontAwesomeIcon icon={faPaperclip} />
        <FontAwesomeIcon icon={faFaceSmile} />
        <FontAwesomeIcon icon={faPaperPlane} onClick={()=>handleMsg()} />
        </div>
         
      </div>  
    </>
  )
}

export default Middlepart