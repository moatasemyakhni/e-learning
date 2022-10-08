export const baseUrl = "http://127.0.0.1:8000/api";

export const emptyField = (props) => {
    if(props.name === '' || props.password === '') {
        return true;
    }
    return false;
}

export const fullNameValidate = (name) => {
    if(name === '') {
        return false;
    }

    if(name.length < 6) {
        return false;
    }
    
    const exp = /^[A-Za-z]+\s?[A-Za-z]+$/;
    if(!name.match(exp)) {
        return false;
    }

    return true;
}

export const passwordValidate = (pwd) => {
    if(pwd.length < 6) {
        return false;
    }
    return true;
}

export const passwordMatchValidate = (pwd, pwdRepeat) => {
    if(pwd !== pwdRepeat) {
        return false;
    }
    return true;
}