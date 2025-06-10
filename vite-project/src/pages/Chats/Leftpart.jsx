import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase.config';
import { collection, query, where, onSnapshot, orderBy, getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import './Leftpart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Leftpart = () => {
  const [chats, setChats] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState({});

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      setCurrentUser(user);

      const q = query(
        collection(db, 'chats'),
        where('members', 'array-contains', user.uid),
        orderBy('updatedAt', 'desc')
      );

      const unsubscribeChats = onSnapshot(q, async (snapshot) => {
        const chatData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChats(chatData);

        const otherUIDs = chatData.map(chat =>
          chat.members.find(uid => uid !== user.uid)
        );

        const uniqueUIDs = [...new Set(otherUIDs)];
        const newUsers = {};

        for (const uid of uniqueUIDs) {
          try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
              newUsers[uid] = userDoc.data();
            }
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        }

        setOtherUsers(prev => ({ ...prev, ...newUsers }));
      });

      return unsubscribeChats;
    });

    return unsubscribeAuth;
  }, []);

  return (
    <div className="left-panel">
      <div className="search-container">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchicon" />
        <input type="text" placeholder="Search" className="searchbox" />
      </div>

      <div>
        {chats.map(chat => {
          const otherUID = chat.members.find(uid => uid !== currentUser?.uid);
          const otherUser = otherUsers[otherUID];
          return (
            <div key={chat.id} className="chat1">
              <p>{otherUser ? otherUser.username : 'Fetching user...'}</p>
              <p>{chat.lastMessage || 'No messages yet'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leftpart;
