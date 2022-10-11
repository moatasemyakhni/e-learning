import Navbar from "./admin/Navbar";
import { baseUrl, userInfo, postApi, getApi} from "../scripts/utilities";
import { useEffect, useState } from "react";
import Button from "./Button";


const Admin = () => {
    const [name, setName] = useState('');
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const getInstructors = async () => {
        try {
            const url = baseUrl + "/auth/get_instructors";
            const getInstructors = await getApi(url, localStorage.getItem('user_token'));
            console.log("sda", getInstructors);
            setInstructors(getInstructors);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
            setErrorMessage('Server is down');
        }
    }

    const getCourses = async () => {
        try {
            const url = baseUrl + "/auth/get_courses";
            const getCourses = await getApi(url, localStorage.getItem('user_token'));
            console.log("sad", courses)
            setCourses(getCourses);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
            setErrorMessage('Server is down');
        }
    }

    const info = async () => {
        const data = await userInfo(baseUrl, localStorage.getItem('user_token'))
        setName(data.name);
    }
useEffect(() => {
        info();
        getInstructors();
        getCourses();
    }, []);
  return (
    <div>
        <Navbar name={name} />
        <select 
        className="input"
         onChange={(e) => setInstructors(e.target.value)}>
            {
                instructors.map(instructor => <option value={instructor._id}>{instructor.name}</option>)
            }
        </select>
        <select 
        className="input"
         onChange={(e) => setCourses(e.target.value)}>
            {
                courses.map(course => <option value={course.code}>{course.code}</option>)
            }
        </select>
            <Button text={'Confirm'} />
        
    </div>
  )
}

export default Admin