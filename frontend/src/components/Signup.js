import {useRef, useState, useEffect} from 'react';


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

    
  return (
    <>
        <div>Register</div>

    </>
  )
}

export default Signup