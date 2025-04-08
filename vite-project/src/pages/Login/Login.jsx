import React, { useState } from "react";
import "./Login.css";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [currstate, setcurrstate] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { user, registerUser, signInUser, loading, error } = useUserContext();
  const navigate = useNavigate();

  const handleAction = () => {
    if (currstate === "Login") {
      signInUser(email, password);
    } else {
      registerUser(email, username, password);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);
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

        <button onClick={handleAction}>
          {loading
            ? "Please wait..."
            : currstate === "Login"
            ? "Login"
            : "Signup"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <h3>
          {currstate === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() =>
              setcurrstate(currstate === "Login" ? "Signup" : "Login")
            }
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
