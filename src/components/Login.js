import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function clearAllCookies() {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      const [name] = cookie.split('=');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [register, Register] = useState(false);
  const navigate = useNavigate();

  const onButtonClick = (ev) => {
    ev.preventDefault();
    const data = { username: email, password: password };
    console.log(data);
    axios
      .post("http://localhost:3005/login/log", data, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
            document.cookie = `userId=${res.data.userRole}; expires=${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
          navigate("/main_page");
        }
      })
      .catch((error) => {});
  };
  const onButtonRegisterClick = () => {
    navigate("/register");
  };
  const display = () => {
    if (register) {
      return "Register";
    } else {
      return "Login";
    }
  };

  return (
    <div>
      <header className="headerBox">
        <div className="header1">
          <i
            class="ms-Icon ms-Icon--Badge"
            aria-hidden="true"
            style={{ fontSize: "55px" }}
          ></i>
        </div>
        <div className="header2">Tandon Police DEPT DB</div>
        { clearAllCookies()}
      </header>
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>{display()}</div>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            className={"inputBox"}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClick}
            value={"Log in"}
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            onClick={onButtonRegisterClick}
            value={"Sign up"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
