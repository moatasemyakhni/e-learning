import { Link, NavLink } from "react-router-dom";


const Navbar = ({name}) => {

  const logout = () => {
    localStorage.removeItem('user_token');
  }

  return (
    <>
    <nav className="nav">
      <Link className="title" to="/admin">{name}</Link>
      <ul>
          <li><NavLink className={(navData) => navData.isActive ? "active" : "" } to="/admin/people">Add Person</NavLink></li>
          <li><NavLink className={(navData) => navData.isActive ? "active" : "" } to="/admin/course">Add Course</NavLink></li>
          <li><NavLink onClick={() => logout()} className={(navData) => navData.isActive ? "active" : "" } to="/">Logout</NavLink></li>
      </ul>
    </nav>
    </>    
  )
}

export default Navbar