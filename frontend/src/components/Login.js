import axios from "axios";
import { useRef, useState, useEffect } from "react";
import {emptyField} from "../scripts/utilities";

const Login = () => {
    // set focus when error occur
    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    // set focus on email when loading
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // error will be cleared when change email or pwd
    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    const loginSubmit = async (e) => {
        e.preventDefault();
        // axios here
        if(emptyField({email, password})) {
            setErrorMessage('All Fields are required');
            return;
        }
        console.log(email, password);

        // clear form
        setEmail('');
        setPassword('');
        setSuccess(true);
    }

    const checkUser = async () => {
        
    }

  return (
    <>
    {/* if we logged in successfully */}
    {success ? (
        <section>
            <h1>You are being redirected</h1>
            <p>
                Waiting...
            </p>
        </section>
    ) : ( 
        <div>
            <p ref={errorRef} className={errorMessage ? "error-msg": "view-none"} aria-live="assertive">{errorMessage}</p>
            <form onSubmit={loginSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    
                />

                <button>Login</button>
            </form>
            <p>Need an Account?</p>
            {/* need a route */}
            <a href="#">Sign Up</a>
        </div>
        )}
    </>
  )
}

export default Login