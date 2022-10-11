import { baseUrl, getApi} from "../../scripts/utilities"
import { useEffect, useState } from "react";

const StudentAnnouncements = () => {


    const [empty, setEmpty] = useState(true);
    const [announcement, setAnnouncement] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const getAnnouncement = async () => {
      const url = baseUrl + "/auth/announcements";
      try {
        const data = await getApi(url, localStorage.getItem('user_token'));
        setErrorMessage('');
        if(data.length === 0) {
            setEmpty(true);
  
        }else {
            setEmpty(false);
            setAnnouncement(data);
            
        }
      } catch(err) {
        setErrorMessage('Server is not responding');
        setEmpty(true);
      }
      
    }
  useEffect(() => {
    const x = async () => await getAnnouncement();
    x();
  }, [])

  return (
    <>
    
    <h3>Announcements</h3>
        {empty? (
          <>
            <p>No Announcements</p>
            {/* in case there is error */}
            <p>{errorMessage}</p>
           </>
        ): (
            announcement.map((announce) => {
            return (
              <div>
              <h3>{announce.title}</h3>
              <h4>{announce.description}</h4>
            </div>
            )
          })
        )}
    </>
  )
}

export default StudentAnnouncements