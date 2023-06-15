import "./Login.css";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const [incorrectCredentials, setIncorrectCredentials] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/users/getLoggedInUser', {credentials : "include"})
        .then(res => res.json())
        .then(data => {
          if (data?.username){
            navigate('/');
          }
        }); 
      }, []);

    const login = (event) => {
        event.preventDefault();
        console.log("login");
        console.log(event.target.username.value);
        console.log(event.target.password.value);
        fetch('http://localhost:3001/users/login', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            credentials : "include",
            body: JSON.stringify({username: event.target.username.value, password: event.target.password.value}),
        })
        .then(res => res.status)
            .then(status => {
                if (status === 200){
                    navigate('/');
                }
                else {
                    console.log(status);
                    setIncorrectCredentials(true);
                }
        }); 
    }

    return (
        <div className="login-container">
            <div className="login">
                <div className="image"></div>
                <form className="login-form" onSubmit={(event) => login(event)}>
                    <label className="label">Username</label>
                    <input className="input-text" type="text" name="username" placeholder="Username" />
                    <label className="label">Password</label>
                    <input className="input-text" type="password" name="password" placeholder="Password" />
                    <button className='input-button' type="submit">Login</button>
                </form>
                {incorrectCredentials ? <p className='error'> Incorrect username or password!</p> : <p className='hidden-error'>hello</p>}
                <footer className="login-footer">
                    <a href="#">Forgot Password?</a>
                    <a href="#">Create an Account</a>
                </footer>
            </div>
        </div>
    );
}