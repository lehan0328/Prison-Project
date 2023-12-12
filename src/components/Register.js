import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = (ev) => {
    ev.preventDefault();
    const data = { username: email, password: password };
    console.log(data);
    axios
      .post("http://localhost:3005/register/regi", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/");
        }
      })
      .catch((error) => {});
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
      </header>
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Sign Up</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Set your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Set your password here"
          type="password"
          onChange={(ev) => setPassword(ev.target.value)}
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
          value={"Done"}
        />
      </div>
    </div>
    </div>
  );
};

export default Register;
