import '../App.css';
import {React} from 'react'
import {  useNavigate ,Link,useLocation } from "react-router-dom"
const Navigate = () => {
    let location = useLocation();
  let history =  useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('token');
    history('/login')
  }

  return (
    <div>
      <header className="header">

{/* <a href="#home" className="logo"> <i className="fas fa-heartbeat"></i> MedMinder. </a> */}
<Link to="/home"  className="logo" > <i className="fas fa-heartbeat"></i> MedMinder.</Link>
<nav className="navbar">
    <Link  className={`nav-link${
                    location.pathname === "/home" ? " active" : ""
                  }`}
     to="/home">home</Link>
    <Link to="/service">Service</Link>
    <Link to="/about">About</Link>
    <Link to="/blogs">Blogs</Link>

    {!localStorage.getItem("token")?
          <div className="d-flex">
            <Link 
            className="btn_1 " to="/login" role="button">
              Login
            </Link>
            <Link className="btn_1" to="/" role="button">
              Signup
            </Link>
          </div>
          :
          <div className="d-flex">
            <Link className="btn_1" to="/" onClick={handleLogOut} role="button">
              LogOut
            </Link>
          </div>}
   {/* <div className="container"> <button
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
  <button
          type="submit"
          className="btn btn-primary"
        >
        Logout
        </button></div> */}
</nav>

<div id="menu-btn" className="fas fa-bars"></div>

</header>
    </div>
  )
}

export default Navigate
