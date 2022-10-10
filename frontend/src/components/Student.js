import Navbar from "./Navbar"
import { baseUrl, userInfo, postApi, getApi} from "../scripts/utilities"
import { useEffect, useState } from "react";

const Student = () => {

    const [name, setName] = useState('');
    const [id, set_id] = useState(null);
    const [empty, setEmpty] = useState(true);
    const [courses, setCourses] = useState('');

    const info = async () => {
        const data = await userInfo(baseUrl, localStorage.getItem('user_token'))
        setName(data.name);
        set_id(data._id);
    }

    useEffect(() => {
        info();
    }, []);

  return (
    <div>
        <Navbar name={name} />
    </div>
  )
}

export default Student