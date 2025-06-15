import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './Middlepart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { db,auth } from '../../firebase.config';
import { collection, addDoc,setDoc,doc, serverTimestamp,onSnapshot,query,orderBy } from 'firebase/firestore';
import { faPhone, faVideo, faPaperclip, faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Picker, { Emoji } from 'emoji-picker-react'


const Middlepart = ({selectedchat}) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const[otherUser,setOtherUser]=useState(null)
  const [emoji,setEmoji]=useState(false);
  
  const handleEmojiClick=(emojiObject)=>{
    setMessageText((prev)=>prev+emojiObject.emoji)
  };
  const emojiPickerRef = useRef();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setEmoji(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
  
  const user1 = auth.currentUser?.uid || 'anonymous'; 
  
  
  const chatId=selectedchat?.id;
  useEffect(() => {
    if(!chatId){
      return;
    }
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
  
  useEffect(()=>{
     if (!selectedchat || !selectedchat.members || !user1) return;
    const otherUID = selectedchat.members.find((uid) => uid !== user1);

    if(!otherUID) return;
    
    const docref=doc(db,'users',otherUID)
    const unsub=onSnapshot(docref,(snapshot)=>{
      setOtherUser(snapshot.data());
    })
    return ()=>unsub();
  },[selectedchat,user1])

  const sendMessage = async () => {
    if (!messageText.trim()) return;
    
    const user2 = selectedchat.members.find((uid) => uid !== user1);
    
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
  if (!selectedchat || !selectedchat.id || !selectedchat.members || !user1) {
    return (
      <div className="middle-panel no-chat">
        <p>Select a chat to start messaging.</p>
      </div>
    );
  }

  
  return (
    <>
      <div className='nav-container'>
        <div className="nb">
        <h4 className='name'>{otherUser?.username}</h4>
        <p className='bio'>{otherUser?.bio}</p>
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
        <FontAwesomeIcon icon={faFaceSmile} onClick={()=>setEmoji((prev)=>!prev)}
        style={{cursor:'pointer'}}/>
        {emoji && (
    <div
      ref={emojiPickerRef}
      style={{
        position: 'absolute',
        bottom: '70px',
        right: '20px',
        zIndex: 1000,
        boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      <Picker onEmojiClick={handleEmojiClick} />
    </div>
  )}





        <FontAwesomeIcon icon={faPaperPlane} onClick={()=>sendMessage()} />
        </div>
         
      </div>  
    </>
  )
}

export default Middlepart