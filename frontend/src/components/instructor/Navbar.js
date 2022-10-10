import { Routes, Route, Link, NavLink } from "react-router-dom";

const Navbar = ({name}) => {

  const logout = () => {
    localStorage.removeItem('user_token');
  }
  return (
    <>
    <nav className="nav">
            <Link className="title" to="/instructor">{name}</Link>
            <ul>
                <li><NavLink className={(navData) => navData.isActive ? "active" : "" } to="/instructor/courses">Courses</NavLink></li>
                <li><NavLink className={(navData) => navData.isActive ? "active" : "" } to="/instructor/announcements">Announcements</NavLink></li>
                <li><NavLink onClick={() => logout()} className={(navData) => navData.isActive ? "active" : "" } to="/">Logout</NavLink></li>

            </ul>
        </nav>
        </>
        
  )
}

export default Navbar