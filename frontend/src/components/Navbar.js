import { Link, NavLink } from "react-router-dom"

const Navbar = ({name}) => {
  return (
    <nav className="nav">
            <Link className="title" to="/student">{name}</Link>
            <ul>
                <li><NavLink className={(navData) => navData.isActive ? "active" : "" } to="/student/assignments">Assignments</NavLink></li>
                <li><NavLink className={(navData) => navData.isActive ? "active" : "" } to="/student/courses">Courses</NavLink></li>
                <li><NavLink className={(navData) => navData.isActive ? "active" : "" } to="/">Logout</NavLink></li>
            </ul>
        </nav>
  )
}

export default Navbar