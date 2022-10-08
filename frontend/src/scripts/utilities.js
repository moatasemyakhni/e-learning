export const emptyField = (props) => {
    if(props.name == '' || props.password == '') {
        return true;
    }
    return false
}

