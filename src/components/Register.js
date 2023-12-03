import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    const onButtonClick =() => {
        navigate(-1);
    }
    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Sign Up</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Set your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Set your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Done"} />
        </div>
    </div>
}

export default Register