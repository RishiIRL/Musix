import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ALogin({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage("");

        const adminCredentials = {
            username: "admin",
            password: "admin123",
        };

        if (username === adminCredentials.username && password === adminCredentials.password) {
            localStorage.setItem("isAdminLoggedIn", true);
            onLoginSuccess();
        } else {
            setErrorMessage("Invalid username or password.");
        }
    };

    return (
        <div className="admin-login-page">
            <h1 style={{ textAlign: "center", fontSize: "35px", fontFamily:"monospace"}}>Admin Login</h1>
            <div className="wrapper">
                <div className="form-container">
                    <div className="logintitle" id="titlename">
                        <span style={{ fontWeight: 800, fontSize: "32px", marginLeft: "120px" }}>Vibe</span>
                        <span style={{ fontWeight: 400, fontSize: "32px" }}>Nest</span>
                    </div>
                    <div className="form-inner">
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
                        </form>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>
                </div>
            </div>
            <button className='isnotadmin' onClick={() => navigate("/")} >Not an Admin?</button>
        </div>
    );
}

export default ALogin;
