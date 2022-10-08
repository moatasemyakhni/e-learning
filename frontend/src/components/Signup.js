import {useRef, useState, useEffect} from 'react';
import {baseUrl, emptyField, fullNameValidate, emailValidation, passwordValidate, passwordMatchValidate} from '../scripts/utilities';


function Signup() {
    // set focus on load
    const fullNameRef = useRef();
    const errorRef = useRef();
    
    const [fullName, setFullName] = useState('');
    const [validName, setValidName] = useState(false);
    const [fullNameFocus, setFullNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [validPasswordConfirm, setValidPasswordConfirm] = useState(false);
    const [passwordFocusConfirm, setPasswordFocusConfirm] = useState(false);

    // message is not viewed by default
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    // set focus on fullName when component load 
    useEffect(() => {
        fullNameRef.current.focus();
    }, []);

    useEffect(() => {
        const result = fullNameValidate(fullName);
        setValidName(result);
    }, [fullName]);

    useEffect(() => {
        const result = emailValidation(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = passwordValidate(password);
        setValidPassword(result);
        const match = passwordMatchValidate(password, passwordConfirm);
        setValidEmail(match);
    }, [password, passwordConfirm]);

    useEffect(() => {

    }, [fullName, email, password, passwordConfirm]);
  return (
    <>
        <div>Register</div>

    </>
  )
}

export default Signup