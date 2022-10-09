import axios from "axios";
import { useRef, useState, useEffect } from "react";
import {baseUrl, emptyField, userInfo} from "../scripts/utilities";
import Button from "./Button";
import FormTitle from "./FormTitle";
import WaitingSection from "./WaitingSection";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    // set focus when error occur
    const emailRef = useRef();
    const errorRef = useRef();
    const buttonRef = useRef();
    const navigate = useNavigate();

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
        buttonRef.current.disabled = true;
        try {
            const user = await checkUser(formData);
            if(!user.error) {
                window.localStorage.setItem('user_token', user.access_token);
                setSuccess(true);
                const get_info = await userInfo(baseUrl, user.access_token);
                const get_type = get_info.type;
                // clear form
                setEmail('');
                setPassword('');
                if(get_type === 'admin')
                    navigate('/admin');
                else if(get_type === 'student')
                    navigate('/student');
                else if(get_type === 'instructor')
                    navigate('/instructor');
                return;
            }
            
            setErrorMessage("Wrong Email or Password");
            setSuccess(false);
        } catch(err) {
            setErrorMessage("Server is not responding");
            setSuccess(false);
        }finally {
            buttonRef.current.disabled = false;
        }
       
    }

    const checkUser = async (dataForm) => {
        const url = baseUrl + "/auth/login";
        const response = await axios.post(url, dataForm);
        const data = await response.data;
        return data;
    }

  return (
    <div className="form-cover">
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

                <Button btnRef={buttonRef} text='Login' />
            </form>
            <p className="form-link">Need an Account?</p>
            {/* need a route */}
            <Link className="form-link" to="/signup">Sign Up</Link>
        </div>
        )}
    </div>
  )
}

export default Login