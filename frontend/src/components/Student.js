import Navbar from "./student/Navbar";
import { baseUrl, userInfo, postApi, getApi} from "../scripts/utilities";
import { useEffect, useState } from "react";


const Student = () => {
  const [name, setName] = useState('');
  const [empty, setEmpty] = useState(true);
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [enrollCourse, setEnrollCourse] = useState(courses[0]);

  // get user info from token
  const info = async () => {
      const data = await userInfo(baseUrl, localStorage.getItem('user_token'))
      setName(data.name);
  }

  const getUnregisteredCourses = async () => {
    const url = baseUrl + "/auth/non_registered_courses";
    try {
      const getCourses = await getApi(url, localStorage.getItem('user_token'));
      setCourses(getCourses);
    }catch(err) {
      setEmpty(true);
      setErrorMessage('Server is not responding'); 
    }
  }

  const enroll = async (e) => {
    let val;
    if(!e || e === undefined) {
      val = courses[0].code;
    }else {
      val = e.target.value;
    }
    const url = baseUrl + "/auth/student_register_course";
    try {
      const dataForm = new FormData();
      dataForm.append('courses', val)
      const post = await postApi(url, dataForm, localStorage.getItem('user_token'));
    } catch(err) {
      setEmpty(true);
      setErrorMessage('Server is not responding');
    }
  }
  
  useEffect(() => {
    info();
    getUnregisteredCourses();
  }, []);

  return (
    <div>
        <Navbar name={name} />
        <div className="wrapper">
          <h2 className="title">Enroll in Course</h2>
          <p>course name</p>
          <div>
            <select onChange={(e) => setEnrollCourse(e)} className="btn">
              {
                courses.map(course => <option value={course.code}>{course.code}</option>)
              }
            </select>
            <button onClick={() => enroll(enrollCourse)} className="btn">Enroll</button>
          </div>
        </div>
    </div>
  )
}

export default Student