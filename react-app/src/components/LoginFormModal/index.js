import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push("/posts")
    }
  };

  const demoUser = (e) => {
    e.preventDefault()
    closeModal()
    history.push("/posts")
    return dispatch(login("demo@aa.io", "password"))
  }

  return (
    <>
      <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form" id="p-form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button onClick={demoUser} className="normal-demo-button">Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
