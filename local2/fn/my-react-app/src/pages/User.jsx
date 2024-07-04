import React, { useState } from "react";
import axios from "axios";
import registerstyle from "../App.css";
import "../App.css"; // Import your CSS file
import { Outlet, Link } from "react-router-dom";

const App = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      console.log("Sending request to create user...");
      const res = await axios.post("http://34.126.142.20:5000/api/users", {
        name,
        username,
        password,
      });
      console.log("User created:", res.data);
      alert("User created");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Duplicate username error from the server
        alert("Username already exists:", error.response.data);
        setMessage(
          "Username already exists. Please choose a different username."
        );
      } else {
        // Other errors
        alert("Error creating user:", error);
        setMessage("Error creating user.");
      }
    }
  };

  return (
    <div className={registerstyle.register}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="lname"
            id="lname"
            placeholder="Display Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="lname"
            id="lname"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="lname"
            id="lname"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already registered? Login</Link>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
