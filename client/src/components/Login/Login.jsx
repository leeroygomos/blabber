import "./Login.css";

export default function Login(){

    const login = () => {
        //TODO: login
    }

    return (
        <div className="login-container">
            <div className="login">
                <div className="image"></div>
                <form className="login-form" onSubmit={() => login()}>
                    <label className="label">Username</label>
                    <input className="input-text" type="text" name="username" placeholder="Username" />
                    <label className="label">Password</label>
                    <input className="input-text" type="password" name="password" placeholder="Password" />
                    <button className='input-button' type="submit">Login</button>
                </form>
                <footer className="login-footer">
                    <a href="#">Forgot Password?</a>
                    <a href="#">Create an Account</a>
                </footer>
            </div>
        </div>
    );
}