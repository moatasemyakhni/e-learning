import axios from 'axios';
import {useRef, useState, useEffect} from 'react';
import {baseUrl, emptyField, fullNameValidate, passwordValidate, passwordMatchValidate, emailValidate} from '../scripts/utilities';


function Signup() {
    // set focus on load
    const fullNameRef = useRef();
    const errorRef = useRef();
    
    const [fullName, setFullName] = useState('');

    const [email, setEmail] = useState('');

    const [type, setType] = useState('student');

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
    const formData = new FormData();
    formData.append('email', email);
    try {
        const checkEmail = await checkEmailExistance(formData);
        if(!checkEmail.available) {
            setErrorMessage('Email is taken');
            setSuccess(false);
            return;
        }
        // now we can signup
        try {

        }catch(err) {
            setErrorMessage('Server is not responding');
            setSuccess(false);
            return;
        }

    }catch(err) {
        setErrorMessage('Server is not responding');
        setSuccess(false);
        return;
    }
}

const checkEmailExistance = async (dataForm) => {
    const url = baseUrl + "/check_email";
    const response = await axios.post(url, dataForm);
    const checkEmail = await response.data;
    return checkEmail;
}

  return (
    <>
        {success ? (
        <section>
            <h1>You are being redirected</h1>
            <p>
                Waiting...
            </p>
        </section>
    ) : ( 
        <div>
            <p ref={errorRef} className={errorMessage ? "error-msg": "view-hidden"} aria-live="assertive">{errorMessage}</p>
            <h1>Register</h1>
            <form onSubmit={signupForm}>
                {/* name input */}
                <label htmlFor='fullName'>
                    fullName:
                </label>
                <input 
                    type="text"
                    id="fullName"
                    ref={fullNameRef}
                    onChange = {(e) => setFullName(e.target.value)}
                    required
                    />

                    {/* email input */}
                    <label htmlFor='email'>
                    Email:
                </label>
                <input 
                    type="email"
                    id="email"
                    onChange = {(e) => setEmail(e.target.value)}
                    required
                    />

                {/* password */}
                <label htmlFor='password'>
                    Password:
                </label>
                <input 
                    type="password"
                    id="password"
                    onChange = {(e) => setPassword(e.target.value)}
                    required
                    />

                {/* password Confirm */}
                <label htmlFor='password-repeat'>
                    Confirm Password:
                </label>
                <input 
                    type="password"
                    id="password-repeat"
                    onChange = {(e) => setPasswordConfirm(e.target.value)}
                    required
                    />

                {/* type */}
                <label htmlFor='user-type'>
                    Type:
                </label>
                <select name='type' id='type' defaultValue={type} onChange={(e) => setType(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                </select>

                <button>Sign Up</button>
            </form>
            <p>Already have an account?</p>
            {/* need a route */}
            <a href="/">Login</a>
        </div>
    )}
    </>
  )
}
Signup.defaultProps = {

}
export default Signup