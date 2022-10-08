import { useRef, useState, useEffect } from "react";

const Login = () => {
    // set focus when error occur
    const userRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [sucess, setSuccess] = useState(false);

  return (
    <div>Login</div>
  )
}

export default Login