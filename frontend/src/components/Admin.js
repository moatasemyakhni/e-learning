import Navbar from "./admin/Navbar";
import { baseUrl, userInfo, postApi, getApi} from "../scripts/utilities";
import { useEffect, useState } from "react";
import Signup from "./Signup";


const Admin = () => {
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
    </div>
  )
}

export default Admin