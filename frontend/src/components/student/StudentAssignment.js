import { baseUrl, getApi, postApi} from "../../scripts/utilities"
import { useEffect, useState } from "react";

const StudentAssignment = () => {


    const [empty, setEmpty] = useState(true);
    const [assignment, setAssignments] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getAssignments = async () => {
      const url = baseUrl + "/auth/assignments";
      try {
        const data = await getApi(url, localStorage.getItem('user_token'));
        setErrorMessage('');
        if(data.length === 0) {
            setEmpty(true);
  
        }else {
            setEmpty(false);
            setAssignments(data);
            
        }
      } catch(err) {
        setErrorMessage('Server is not responding');
        setEmpty(true);
      }
      
    }
  useEffect(() => {
    const x = async () => await getAssignments();
    x();
  }, [])


  const submitAssignment = async (e, id) => {
    const url = baseUrl + "/auth/submit_assignment";
    
    e.target.classList.add('view-none');
    try {
      const dataForm = new FormData();
      dataForm.append('_id', id);
      const response = await postApi(url, dataForm, localStorage.getItem('user_token'));
      setEmpty(false);
    }catch(err) {
      setEmpty(true);
      setErrorMessage('Server is not responding');
    }
  }

  return (
    <>
    
    <h3>Assignments</h3>
        {empty? (
          <>
            <p>No Assignments</p>
            {/* in case there is error */}
            <p>{errorMessage}</p>
           </>
        ): (
          assignment.map((assign) => {
            return (<div>
            <h3>{assign.title}</h3>
            <button className="btn" onClick={(e) => submitAssignment(e, assign._id)}>Submit</button>
            </div>
            )
          })
          )}
    </>
  )
}

export default StudentAssignment;