import axios from "axios";
import { useRef, useState, useEffect } from "react";
import {baseUrl, emptyField} from "../scripts/utilities";
import FormTitle from "./FormTitle";
import WaitingSection from "./WaitingSection";

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
        if(emptyField({email, password})) {
            setErrorMessage('All Fields are required');
            setSuccess(false);
            return;
        }
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const user = await checkUser(formData);
            if(!user.error) {
                window.localStorage.setItem('user_token', user.access_token);
                setSuccess(true);
                // clear form
                setEmail('');
                setPassword('');
                return;
            }
            
            setErrorMessage("Wrong Email or Password");
            setSuccess(false);
        } catch(err) {
            setErrorMessage("Server is not responding");
            setSuccess(false);
        }
       
    }

    const checkUser = async (dataForm) => {
        const url = baseUrl + "/auth/login";
        const response = await axios.post(url, dataForm);
        const data = await response.data;
        return data;
    }

  return (
    <>
    {/* if we logged in successfully */}
    {success ? (
        <WaitingSection />
    ) : ( 
        <div>
            <FormTitle titleName="Sign in"/>
            <p ref={errorRef} className={errorMessage ? "error-msg": "view-hidden"} aria-live="assertive">{errorMessage}</p>
            <form className="form" onSubmit={loginSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="input"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="input"
                        required 
                    />
                </div>

                <button className="btn btn-form">Login</button>
            </form>
            <p className="form-link">Need an Account?</p>
            {/* need a route */}
            <a className="form-link" href="/signup">Sign Up</a>
        </div>
        )}
    </>
  )
}

export default Login