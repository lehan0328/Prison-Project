import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate();

    const onButtonClick = (ev) => {

        ev.preventDefault()
        const data = {username: email, password: password}
        console.log(data)
        axios.post('http://localhost:3005/login/log', data)
        .then(res=>{
            console.log(res.data);
            if(res.data.success){
                navigate("/main_page");
            }
        })
        .catch(error=>{

        })
    }
    const onButtonRegisterClick = () =>{
        navigate("/Register");
    }

    return <div className={"mainContainer"}>
        
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
            
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                type="password"
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonRegisterClick}
                value={"Sign up"} />
        </div>
    </div>
}

export default Login