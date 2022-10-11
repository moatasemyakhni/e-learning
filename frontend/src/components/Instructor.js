import Navbar from "./instructor/Navbar";
import { baseUrl, userInfo } from "../scripts/utilities";
import { useEffect, useState } from "react";
import Signup from "./Signup";


const Instructor = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    info();
  }, []);

  const info = async () => {
    const data = await userInfo(baseUrl, localStorage.getItem('user_token'))
    setName(data.name);
  }

  return (
    <div>
        <Navbar name={name} />

        <Signup user_types={['student']} api={'register_student'} />
    </div>
  )
}

export default Instructor