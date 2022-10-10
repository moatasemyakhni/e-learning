import { baseUrl, getApi} from "../../scripts/utilities"
import { useEffect, useState } from "react";

const StudentCourse = () => {


    const [empty, setEmpty] = useState(true);
    const [courses, setCourses] = useState('');

    const getCourses = async () => {
      const url = baseUrl + "/auth/courses";
      const data = await getApi(url, localStorage.getItem('user_token'));
      if(data.length === 0) {
          setEmpty(true);

      }else {
          setEmpty(false);
          setCourses(data);
          
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
           <p>No enrolled Courses</p>
        ): (
          courses.map((course, index) => {
            return <h3>{course}</h3>
          })
          )}
    </>
  )
}

export default StudentCourse