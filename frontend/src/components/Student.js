import Navbar from "./Navbar"
import { baseUrl, userInfo, postApi, getApi} from "../scripts/utilities"
import { useEffect, useState } from "react";
const Student = () => {

    const [name, setName] = useState('');
    const [id, set_id] = useState(null);
    const [empty, setEmpty] = useState(true);
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);
    const [enrollCourse, setEnrollCourse] = useState(courses[0]);

    const info = async () => {
        const data = await userInfo(baseUrl, localStorage.getItem('user_token'))
        setName(data.name);
        set_id(data._id);
    }
    const getUnregisteredCourses = async () => {
      const url = baseUrl + "/auth/non_registered_courses";
      try {

        const getCourses = await getApi(url, localStorage.getItem('user_token'));
        setCourses(getCourses);
        console.log("tget,", courses);
      }catch(err) {
        setEmpty(true);
        setErrorMessage('Server is not responding'); 
        console.log( "err")

      }


    }
    useEffect(() => {
        info();
        getUnregisteredCourses();
    }, []);

    const enroll = async (e) => {
      let val;
      if(!e || e == undefined) {
        val = courses[0].code;
      }else {
        val = e.target.value;
      }
      console.log(e);
      const url = baseUrl + "/auth/student_register_course";
      try {
        const dataForm = new FormData();
        dataForm.append('courses', val)
        const post = await postApi(url, dataForm, localStorage.getItem('user_token'));
        console.log(post);
      } catch(err) {
        setEmpty(true);
        setErrorMessage('Server is not responding');
      }
    } 
  return (
    <div>
        <Navbar name={name} />
        <h2>Enroll in Course</h2>
        <span>course name</span>
        <select onChange={(e) => setEnrollCourse(e)} className="btn">
          {
             courses.map((course) => {
              return <option  value={course.code}>{course.code}</option>
            })
          }
        </select>
        <button onClick={() => enroll(enrollCourse)} className="btn">Enroll</button>
    </div>
  )
}

export default Student