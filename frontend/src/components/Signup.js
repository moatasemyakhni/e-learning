import axios from 'axios';
import {useRef, useState, useEffect} from 'react';
import {baseUrl, emptyField, fullNameValidate, passwordValidate, passwordMatchValidate, emailValidate} from '../scripts/utilities';
import WaitingSection from './WaitingSection';
import FormTitle from "./FormTitle";
import Button from './Button';
import { Link, useNavigate } from "react-router-dom";


function Signup({user_types}) {
    // set focus on load
    const fullNameRef = useRef();
    const errorRef = useRef();
    const buttonRef = useRef();
    const navigate = useNavigate();
    
    const [fullName, setFullName] = useState('');

    const [email, setEmail] = useState('');

    const [type, setType] = useState(user_types[0]);

    const [password, setPassword] = useState('');

    const [passwordConfirm, setPasswordConfirm] = useState('');

    // message is not viewed by default
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    // set focus on fullName when component load 
    useEffect(() => {
        fullNameRef.current.focus();
    }, []);


const signupForm = async (e) => {
    e.preventDefault();
    const allInputvalue = {
        name: fullName,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
    }
    if(emptyField(allInputvalue)) {
        setErrorMessage('All Fields are required');
        setSuccess(false)
        return;
    }
    if(!fullNameValidate(fullName)) {
        setErrorMessage('name is at least 6 chars, e.g: John smith');
        setSuccess(false);
        return;
    }

    if(!emailValidate(email)) {
        setErrorMessage('wrong email format');
        setSuccess(false);
        return;
    }

    if(!passwordValidate(password)) {
        setErrorMessage('password is at least 6 chars');
        setSuccess(false);
        return;
    }

    if(!passwordMatchValidate(password, passwordConfirm)) {
        setErrorMessage('Passwords do not match');
        setSuccess(false);
        return;
    }

    if(type !== "admin" && type !== "instructor" && type !== "student") {
        setErrorMessage('wrong option in select');
        setSuccess(false);
        return;
    }
    buttonRef.current.disabled = true;
    const formData = new FormData();
    formData.append('email', email);
    try {
        const checkEmail = await checkEmailExistance(formData);
        if(!checkEmail.available) {
            setErrorMessage('Email is taken');
            setSuccess(false);
            return;
        }
    }catch(err) {
        setErrorMessage('Server is not responding');
        setSuccess(false);
        return;
    }finally {   
        buttonRef.current.disabled = false;
    }
    buttonRef.current.disabled = true;
    formData.append('name', fullName);
    formData.append('password', password);
    formData.append('type', type);
    // now we can signup
    try {
        const register = await registerAccount(formData);
        if(register.error) {
            setErrorMessage('Register Failed');
            setSuccess(false);
            return;
        }
        const token = register.token.original.access_token;
        localStorage.setItem('user_token', token);
        setSuccess(true);
        // clear form
        setEmail('');
        setPassword('');
        if(type === 'admin')
            navigate('/admin');
        else if(type === 'student')
            navigate('/student');
        else if(type === 'instructor')
            navigate('/instructor');
        return;

    }catch(err) {
        setErrorMessage('Server is not responding');
        setSuccess(false);
        return;
    }finally {
        buttonRef.current.disabled = false;
    }
}

const checkEmailExistance = async (dataForm) => {
    const url = baseUrl + "/check_email";
    const response = await axios.post(url, dataForm);
    const checkEmail = await response.data;
    return checkEmail;
}

const registerAccount = async (dataForm) => {
    const url = baseUrl + "/auth/register";
    const response = await axios.post(url, dataForm);
    const result = response.data;
    return result;
}

  return (
    <div className="form-cover">
        {success ? (
        <WaitingSection />
    ) : ( 
        <div>
            <FormTitle titleName="Register"/>
            <p ref={errorRef} className={errorMessage ? "error-msg": "view-hidden"} aria-live="assertive">{errorMessage}</p>
            <form className="form" onSubmit={signupForm}>
                {/* name input */}
                <div>
                    <label htmlFor='fullName'>
                        fullName:
                    </label>
                    <input 
                        type="text"
                        id="fullName"
                        ref={fullNameRef}
                        onChange = {(e) => setFullName(e.target.value)}
                        required
                        className='input'
                        />
                </div>

                {/* email input */}
                <div>
                    <label htmlFor='email'>
                        Email:
                    </label>
                    <input 
                        type="email"
                        id="email"
                        onChange = {(e) => setEmail(e.target.value)}
                        required
                        className='input'
                    />
                </div>

                {/* password */}
                <div>
                    <label htmlFor='password'>
                        Password:
                    </label>
                    <input 
                        type="password"
                        id="password"
                        onChange = {(e) => setPassword(e.target.value)}
                        required
                        className='input'
                        />
                </div>

                {/* password Confirm */}
                <div>
                    <label htmlFor='password-repeat'>
                        Confirm Password:
                    </label>
                    <input 
                        type="password"
                        id="password-repeat"
                        onChange = {(e) => setPasswordConfirm(e.target.value)}
                        required
                        className='input'
                        />
                </div>

                {/* type */}
                <div>
                    <label htmlFor='user-type'>
                        Type:
                    </label>
                    <select className='input' name='type' id='type' defaultValue={type} onChange={(e) => setType(e.target.value)}>
                        {
                            user_types.map(type => <option value={type}>{type}</option>)
                        }
                    </select>
                </div>

                <Button btnRef={buttonRef} text="Signup" />
            </form>
            <p className='form-link'>Already have an account?</p>
            {/* need a route */}
            <Link className='form-link' to="/">Login</Link>
        </div>
    )}
    </div>
  )
}
Signup.defaultProps = {

}
export default Signup