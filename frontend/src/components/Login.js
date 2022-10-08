import { useRef, useState, useEffect } from "react";

const Login = () => {
    // set focus when error occur
    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [sucess, setSuccess] = useState(false);

    // set focus on email when loading
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // error will be cleared when change email or pwd
    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

  return (
    <div>
        <p ref={errorRef} className={errorMessage ? "error-msg": "view-none"} aria-live="assertive">{errorMessage}</p>
    </div>
  )
}

export default Login