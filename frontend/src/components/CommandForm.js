import { useRef, useState} from 'react';
import {baseUrl, emptyFieldCommand, postApi} from '../scripts/utilities';
import FormTitle from "./FormTitle";
import Button from './Button';


const CommandForm = ({name, api}) => {
    const buttonRef = useRef();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    
    const create = async (e) => {
        e.preventDefault();
        const allInputvalue = {
        title: title,
        description: description,
        }

        if(emptyFieldCommand(allInputvalue)) {
            setErrorMessage('All Fields are required');
            setSuccess(false)
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        buttonRef.current.disabled = true;
        try {
            const url = baseUrl + `/auth/${api}`;
            const register = await postApi(url, formData, localStorage.getItem('user_token'));
            if(register.error) {
                setErrorMessage('insert Failed');
                setSuccess(false);
                return;
            }
            setSuccess(true);
            setErrorMessage(`${name} created`);
            setTitle('');
            setDescription('');
            // clear form
        }catch(err) {
            setErrorMessage('Server is not responding');
            setSuccess(false);
            return;
        }finally {
            buttonRef.current.disabled = false;
        }
        
    }

  return (
    <div className="form-cover">
       {success? <p>{errorMessage}</p> : <p>{errorMessage}</p>}
        <div>
            <FormTitle titleName={name}/>
            <form className="form" onSubmit={create}>
                <div>
                    <label htmlFor='title'>
                        Title:
                    </label>
                    <input 
                        type="text"
                        id='title'
                        onChange = {(e) => setTitle(e.target.value)}
                        required
                        className='input'
                        value={title}
                        />
                </div>

                <div>
                    <label htmlFor='description'>
                        Description:
                    </label>
                    <input 
                        type="text"
                        id="description"
                        onChange = {(e) => setDescription(e.target.value)}
                        required
                        className='input'
                        value={description}
                    />
                </div>
                <Button btnRef={buttonRef} text="Create" />
            </form>
        </div>
    </div>
  )
}
export default CommandForm