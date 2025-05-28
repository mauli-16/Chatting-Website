import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

const Login = () => {
  const [currstate, setcurrstate] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const handleAction = async () => {
    setLoading(true);
    setError("");
    try {
      if (currstate === "Login") {
        await signInUser(email, password);
        console.log("Logged in");
      } else {
        const userCredential = await registerUser(email, password);
        console.log("Registered user:", userCredential.user.uid);

        // Save username in Firestore using the registered user's UID
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username,
        });
        console.log("Username written successfully");
      }
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="login_out">
      <div className="login_inner">
        <h2>{currstate}</h2>

        {currstate === "Signup" && (
          <>
            <label htmlFor="username">Enter username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
        )}

        <label htmlFor="email">Enter email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Enter password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleAction} disabled={loading}>
          {loading ? "Please wait..." : currstate === "Login" ? "Login" : "Signup"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <h3>
          {currstate === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() => setcurrstate(currstate === "Login" ? "Signup" : "Login")}
            className="ca"
          >
            {currstate === "Login" ? " Create account" : " Login"}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Login;
