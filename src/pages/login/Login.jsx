import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";

import { login } from "../../store/actions/index";

import { apiCall } from "../../utils/apiCall";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const users = await apiCall(
        "https://63e63fd9c8839ccc2854503d.mockapi.io/contacts/users"
      );

      console.log(users);

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        if (user.role === "Admin") {
          dispatch(login("Admin"));
        } else if (user.role === "Normal User") {
          dispatch(login("Normal User"));
        }
        navigate("/");
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginFailed(true);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="form-conatiner" onSubmit={handleLogin}>
        <div className="inputs">
          <label className="label-login" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label className="label-password" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit-button">
          <button type="submit">Login</button>
        </div>
      </form>
      {loginFailed && (
        <p style={{ color: "red", fontSize: "20px" }}>
          Invalid username or password
        </p>
      )}
    </div>
  );
};

export default Login;
