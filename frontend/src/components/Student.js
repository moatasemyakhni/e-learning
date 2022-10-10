import Navbar from "./Navbar"
import { baseUrl, userInfo, postApi, getApi} from "../scripts/utilities"
import { useEffect, useState } from "react";


const Student = () => {

    const [name, setName] = useState('');
    const [id, set_id] = useState(null);
    const [empty, setEmpty] = useState(false);

    const info = async () => {
        const data = await userInfo(baseUrl, localStorage.getItem('user_token'))
        setName(data.name);
        set_id(data._id);
    }

    const getCourses = async () => {
        const url = baseUrl + "/auth/courses";
        const data = await getApi(url, localStorage.getItem('user_token'));
        if(data.length === 0) {
            setEmpty(true);
            console.log("no data");

        }else {
            setEmpty(false);
            console.log(data);
            
        }
    }

    useEffect(() => {
        const x = async () => {
            await info();
            // await getCourses();
        }
        x();
    }, []);

  return (
    <div>
        <Navbar getCourses={getCourses} name={name} />
    </div>
  )
}

export default Student