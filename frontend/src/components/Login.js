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
        <form>
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
             />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
             />

             <button>Sign In</button>
        </form>
        <p>Need an Account?</p>
        <a href="#">Sign Up</a>
    </div>
  )
}

export default Login