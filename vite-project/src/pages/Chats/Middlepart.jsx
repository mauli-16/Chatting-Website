import React from 'react'
import { useState, useEffect } from 'react';
import './Middlepart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { db,auth } from '../../firebase.config';
import { collection, addDoc,setDoc,doc, serverTimestamp,onSnapshot,query,orderBy } from 'firebase/firestore';
import { faPhone, faVideo, faPaperclip, faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Middlepart = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  const user1 = auth.currentUser?.uid || 'anonymous'; 
  const user2 = '8114DVpPmzy9u90tyX2W';
  
  const getchatID=(user1,user2)=>{
    return [user1,user2].sort().join("_");
  }       
  const chatId = getchatID(user1,user2);
  

  const sendMessage = async () => {
    if (!messageText.trim()) return;
    
    try {

      await setDoc(doc(db, 'chats', chatId), {
        members: [user1, user2],
        lastMessage: messageText,
        updatedAt: serverTimestamp()
      }, { merge: true });

      const messagesRef=collection(db,"chats",chatId,"messages");
      await addDoc(messagesRef, {
        sender: user1,
        text: messageText,
        timestamp: serverTimestamp(),
      });
      setMessageText('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);


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
       <div className="messages-display">
        {messages.map((msg, index) => (
          <div key={index} className="msg-bubble">
            <strong>{msg.sender === user1 ? 'You' : 'Them'}:</strong> {msg.text}
          </div>
        ))}
      </div>


      <div className="msg-container">
        <div className="msg-content">
        <input className='actual-msg' type="text" 
        placeholder='Write a message'value={messageText} onChange={(e)=>setMessageText(e.target.value)}/>
        </div>
        
        <div className="attach">
        <FontAwesomeIcon icon={faPaperclip} />
        <FontAwesomeIcon icon={faFaceSmile} />
        <FontAwesomeIcon icon={faPaperPlane} onClick={()=>sendMessage()} />
        </div>
         
      </div>  
    </>
  )
}

export default Middlepart