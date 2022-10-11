import Navbar from "./instructor/Navbar";
import { baseUrl, userInfo, postApi, getApi} from "../scripts/utilities";
import { useEffect, useState } from "react";
import Signup from "./Signup";


const Instructor = () => {
    const [name, setName] = useState('');
const info = async () => {
        const data = await userInfo(baseUrl, localStorage.getItem('user_token'))
        setName(data.name);
    }
useEffect(() => {
        info();
    }, []);
  return (
    <div>
        <Navbar name={name} />

        {/* <Signup user_types={['student']} api={'register_student'} /> */}
    </div>
  )
}

export default Instructor