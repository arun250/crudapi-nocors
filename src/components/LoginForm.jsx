import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [error, setNewError] = useState("");
  const [toast, setToast] = useState(false);
  const [sucMessage, setSucMessage] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newValidErrors = {};
    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newValidErrors.Email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newValidErrors.Email = "Invalid Email format";
    }
    // password
    if (!password) {
      newValidErrors.PasswordHash = "Password is required";
    } else if (password.length < 8) {
      newValidErrors.PasswordHash = "Password must be atleast 8 characters";
    }
    setNewError(newValidErrors);

    return Object.keys(newValidErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const expiryTime = Date.now() + 30 * 60 * 1000;
    if (!validate()) return;
    try {
      const response = await fetch(
        "https://api.covenanttecs.com/Api/CRUD_API2/AuthenticateUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Email: email, PasswordHash: password }),
          
        }
      );

      // Read the raw text first
      const text = await response.text();
      let data = null;

      // Try parsing JSON if possible
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.warn("Response is not JSON:", text);
        }
      }

      if (response.ok && data.success === true) {
        console.log("Login successful", data);
        sessionStorage.setItem("loggedIn", JSON.stringify({
          expiry:expiryTime
        }))
        setSucMessage(data.message)
        alert(data.message)
        navigate("/startpage");
        setToast(true);
        setTimeout(() => setToast(false), 3000);
      } else {
        console.error("Login failed", data.message || text);
        setSucMessage(data?.message || "Login failed");
        setShowErrMsg(true);
        setTimeout(() => setShowErrMsg(false), 3000);
      }
    } catch (err) {
      console.error("Error calling API:", err);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="authentication-bg">
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-primary">
          <div
            className="card overflow-hidden shadow-lg mt-3"
            style={{ maxWidth: 500, width: "100%" }}>
            <div className="row g-0">
              <div className="col-12 p-4">
                <div className="text-center mb-2">
                  <img
                    src={logo}
                    style={{ width: 100, height: 30 }}
                    alt="logo"
                  />
                  <p className="text-black pt-3">
                    Access using your Username and Password.
                  </p>
                </div>
                <form action="#" onSubmit={handleLogin}>
                  <div className="mb-1">
                    <label htmlFor="textBox1" className="form-label text-black">
                      Email
                    </label>
                    <input
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="textBox1"
                      placeholder="Enter your email"
                      runat="server"
                    />
                    {error["Email"] && (
                      <span className="error">{error["Email"]}</span>
                    )}
                  </div>
                  <div className="mb-1">
                    <label htmlFor="textBox2" className="form-label text-black">
                      Password
                    </label>
                    <input
                      type="password"
                      id="textBox2"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      runat="server"
                      placeholder="Enter your password"
                    />
                    {error["PasswordHash"] && (
                      <span className="error">{error["PasswordHash"]}</span>
                    )}
                  </div>
                  <div className="text-center mt-3">
                    <button className="btn btn-primary w-100" type="submit">
                      Login
                    </button>
                  </div>
                  {showSubmitError && (
                    <p className="error-message">*{errorMsg}</p>
                  )}
                  {toast && <div className="success-message">{sucMessage}</div>}
                  {showErrMsg && (
                    <div className="failure-message">{sucMessage}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
