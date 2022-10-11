import { baseUrl, getApi} from "../../scripts/utilities"
import { useEffect, useState } from "react";

const InstructorCourse = () => {


    const [empty, setEmpty] = useState(true);
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const getCourses = async () => {
      const url = baseUrl + "/auth/courses";
      try {
        const data = await getApi(url, localStorage.getItem('user_token'));
        setErrorMessage('');
        if(data.length === 0) {
            setEmpty(true);
  
        }else {
            setEmpty(false);
            setCourses(data);
            
        }
      } catch(err) {
        setErrorMessage('Server is not responding');
        setEmpty(true);
      }
      
    }
  useEffect(() => {
    const x = async () => await getCourses();
    x();
  }, [])

  return (
    <>
    
    <h3>Courses</h3>
        {empty? (
          <>
            <p>No enrolled Courses</p>
            {/* in case there is error */}
            <p>{errorMessage}</p>
           </>
        ): (
          courses.map((course) => {
            return <h3>{course}</h3>
          })
          )}
    </>
  )
}

export default InstructorCourse