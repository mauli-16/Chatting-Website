import React, { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { db, auth } from "../../firebase.config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  getDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import "./Leftpart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Leftpart = ({ onSelectChat, selectedchat }) => {
  const [chats, setChats] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState({});
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, "users"));
      const snapshot = await getDocs(q);

      const filtered = snapshot.docs
        .filter((doc) => doc.id !== currentUser.uid)
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(filtered);

      setUsers(filtered);
    };
    fetchUsers();
  }, [currentUser]);

  const generateChatId = (uid1, uid2) => {
    return uid1 > uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };

  const startChat = async (user) => {
    if (!currentUser) {
      console.error("Cannot start chat, currentUser is null");
      return;
    }
    console.log("cuurent user", currentUser);

    const chatId = generateChatId(currentUser.uid, user.id);
    const chatRef = doc(db, "chats", chatId);
    console.log(chatRef.path);

    console.log("Creating chat with members:", [auth.currentUser.uid, user.id]);
    try {
      const chatSnap = await getDoc(chatRef);
      console.log("Current user:", auth.currentUser?.uid);

      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          members: [currentUser.uid, user.id],
          lastMessage: "",
          updatedAt: Timestamp.now(),
        });
        console.log(chatId);
      }

      if (onChatSelect) {
        onChatSelect({ id: chatId, members: [currentUser.uid, user.id] });
      }
    } catch (error) {
      console.error("🔥 Error in startChat:", error);
    }
  };
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", currentUser.uid)
      //orderBy("updatedAt", "desc")
    );

    const unsubscribeChats = onSnapshot(q, async (snapshot) => {
      const chatData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatData);
      console.log(chatData);

      const otherUIDs = chatData.map((chat) =>
        chat.members.find((uid) => uid !== currentUser.uid)
      );

      const uniqueUIDs = [...new Set(otherUIDs)];
      const newUsers = {};

      for (const uid of uniqueUIDs) {
        try {
          const userDoc = await getDoc(doc(db, "users", uid));
          if (userDoc.exists()) {
            newUsers[uid] = userDoc.data();
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }

      setOtherUsers((prev) => ({ ...prev, ...newUsers }));
    });

    return () => unsubscribeChats();
  }, [currentUser]);

  return (
    <div className="left-panel">
      <div className="search-container">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchicon" />
        <input
          type="text"
          placeholder="Search"
          className="searchbox"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        {chats.map((chat) => {
          const otherUID = chat.members.find((uid) => uid !== currentUser?.uid);
          const otherUser = otherUsers[otherUID];

          return (
            <div
              key={chat.id}
              className="chat1"
              onClick={() => onSelectChat(chat)}
            >
              <div className="user-details">
                <img
                  src={otherUser?.photoURL || "/default-profile.png"}
                  alt={`${otherUser?.username || "User"} profile`}
                  className="user-avatar"
                />
                <div style={{ marginLeft: "1em" }}>
                  <p>{otherUser?.username || "Fetching user..."}</p>
                  <p>{chat.lastMessage || "No messages yet"}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ul className="user-list">
        {users
          .filter(
            (user) =>
              !chats.some((chat) => chat.members.includes(user.id)) &&
              user.username.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <li key={user.id} className="user-item">
              <div className="user-details">
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt={`${user.username}'s profile`}
                  className="user-avatar"
                />
                <strong className="username">{user.username}</strong>
                <button onClick={() => startChat(user)}>Start Chat</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Leftpart;
