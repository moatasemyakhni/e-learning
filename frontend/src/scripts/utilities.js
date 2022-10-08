export const baseUrl = "http://127.0.0.1:8000/api";
export const emptyField = (props) => {
    if(props.name === '' || props.password === '') {
        return true;
    }
    return false;
}

