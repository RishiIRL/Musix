import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css'; 

function Login({ onLoginSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleTabSwitch = (isLogin) => {
    setIsLoginMode(isLogin);
    setErrorMessage(''); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); 
    const data = {
      username,
      pass: password
    };

    if (!isLoginMode && password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/${isLoginMode ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        if (isLoginMode) {
        
            localStorage.setItem('user_id', result.user_id);
            onLoginSuccess();
          } else {
           
            alert('Signup successful! You can now login.');
          }
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      alert('An error occurred while processing your request.');
    }
  };

  return (
    <div className="loginpage">
      <div className="wrapper">
        <div className="form-container">
          <div className="logintitle login" id="titlename">
            <span style={{ fontWeight: 800, fontSize: "32px", marginLeft: "120px" }}>Vibe</span>
            <span style={{ fontWeight: 400, fontSize: "32px" }}>Nest</span>
          </div>
          <div className="slide-controls" id="slidectr">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLoginMode}
              onChange={() => handleTabSwitch(true)}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLoginMode}
              onChange={() => handleTabSwitch(false)}
            />
            <label htmlFor="login" className="slide login">Login</label>
            <label htmlFor="signup" className="slide signup">Signup</label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            
            {isLoginMode && (
              <form className="login" onSubmit={handleSubmit}>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="field loginbtn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login" />
                </div>
                <div className="signup-link">
                  Not a member? <a href="#" onClick={() => handleTabSwitch(false)}>Signup now</a>
                </div>
              </form>
            )}
            
            {!isLoginMode && (
              <form className="signup" onSubmit={handleSubmit}>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="field loginbtn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" />
                </div>
                <div className="signup-link">
                  Already a member? <a href="#" onClick={() => handleTabSwitch(true)}>Login now</a>
                </div>
              </form>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
        </div>
      </div>
      <button className='isadmin' onClick={() => navigate("/admin")} >Are you an Admin?</button>
    </div>
  );
}

export default Login;
