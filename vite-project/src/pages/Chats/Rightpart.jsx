import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.config";
import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./Rightpart.css";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Rightpart = ({ selectedchat }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [mediaMessages, setMediaMessages] = useState([]);
  useEffect(() => {
    if (!selectedchat?.id) return;

    const messagesRef = collection(db, "chats", selectedchat.id, "messages");
    const q = query(messagesRef, where("fileURL", "!=", null)); // Only media messages

    const unsub = onSnapshot(q, (snapshot) => {
      const media = snapshot.docs.map((doc) => doc.data());
      setMediaMessages(media);
    });

    return () => unsub();
  }, [selectedchat]);
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
          src={userData?.photoURL || "default-profile.png"}
          alt="Profile"
        />
        <div className="name">{userData?.username || "Unknown User"}</div>
        <div className="bio">{userData?.bio || "No bio provided"}</div>
      </div>
      <div className="media">Media</div>
      <div className="media-section">
        {mediaMessages.map((msg, index) => (
          <div key={index} className="media-item">
            {msg.fileURL?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <img
                src={msg.fileURL}
                alt="media"
                style={{ width: "100px", borderRadius: "10px" }}
              />
            ) : (
              <a href={msg.fileURL} target="_blank" rel="noopener noreferrer">
                📄 {msg.fileName}
              </a>
            )}
          </div>
        ))}
      </div>
      <button className="logout">Logout</button>
    </div>
  );
};

export default Rightpart;
