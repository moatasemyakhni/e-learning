import Navbar from "./Navbar"
import { baseUrl, userInfo } from "../scripts/utilities"
const info = async () => {
    const data = await userInfo(baseUrl, localStorage.getItem('user_token'))

    console.log(data);
}
info();
const Student = () => {
  return (
    <div>
        <Navbar />
    </div>
  )
}

export default Student