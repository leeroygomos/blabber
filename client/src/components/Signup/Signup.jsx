import './Signup.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(null);

    const signup = (e) => {
        e.preventDefault();

        // check if password matches
        if(e.target.password.value !== e.target.confirm_password.value){
            setErrorMsg('Passwords do not match');
            return;
        }

        fetch(`/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: e.target.email.value,
                username: e.target.username.value,
                password: e.target.password.value
            })
        })
        .then(res => {
            if (res.status === 200){
                navigate('/');
            }
            return res.json();
        })
        .then(data => {
            setErrorMsg(data.message);
        }); 
        
    }

    return (
        <div className="signup-container">
            <div className="signup">
                <div className="image"></div>
                <form className="signup-form" onSubmit={(event) => signup(event)}>
                <label className="label">Email</label>
                    <input className="input-text" type="email" name="email" placeholder="Email" required/>
                    <label className="label">Username</label>
                    <input className="input-text" type="text" name="username" placeholder="Username" required/>
                    <label className="label">Password</label>
                    <input className="input-text" type="password" name="password" placeholder="Password" required/>
                    <label className="label">Confirm Password</label>
                    <input className="input-text" type="password" name="confirm_password" placeholder="Confirm Password" required/>
                    <button className='input-button-signup' type="submit">Signup</button>
                </form>
                {errorMsg ? <p className='error'>{errorMsg}</p> : <p className='hidden-error'>hello</p>}
                <footer className="login-footer">
                    <a href="/login">Already have an account?</a>
                </footer>
            </div>
        </div>
    );
}