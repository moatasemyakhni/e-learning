import Navbar from "./admin/Navbar";
import { baseUrl, userInfo, postApi, getApi} from "../scripts/utilities";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";


const Admin = () => {
    const [name, setName] = useState('');
    const [instructors, setInstructors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [instructor, setInstructor] = useState('');
    const [course, setCourse] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    
    const btnRef = useRef();

    const getInstructors = async () => {
        try {
            const url = baseUrl + "/auth/get_instructors";
            const getInstructors = await getApi(url, localStorage.getItem('user_token'));
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
            setCourses(getCourses);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
            setErrorMessage('Server is down');
        }
    }
    
    const assignCourseToInstructor = async (e) => {
        e.preventDefault();
        const url = baseUrl + "/auth/assign_course";
        btnRef.current.disabled = true;
        try {
            const dataForm = new FormData();
            dataForm.append('_id', instructor);
            dataForm.append('courses', course);
            console.log(instructor, course, "this");
            const assign = await postApi(url, dataForm, localStorage.getItem('user_token'));
            console.log(assign);
        } catch (error) {
            setErrorMessage(true);
            setSuccess(false);
        } finally {
            btnRef.current.disabled = false;

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
        setInstructor(instructors[0]._id);
        setCourse(courses[0].code);
    }, []);

  return (
    <div>
        <Navbar name={name} />
        <form onSubmit={assignCourseToInstructor}>
            <select 
                className="input"
                onChange={(e) => setInstructor(e.target.value)}
                >
                {
                    instructors.map(instructor => <option value={instructor._id}>{instructor.name}</option>)
                }
            </select>

            <select 
                className="input"
                onChange={(e) => setCourse(e.target.value)}
                >
                {
                    courses.map(course => <option value={course.code}>{course.code}</option>)
                }
            </select>   
            <Button btnRef={btnRef} text={'Confirm'} />
        </form> 
    </div>
  )
}

export default Admin