import React from 'react'
import logo from "../assets/images/logo.png"
import fav from "../assets/images/fav.png"
import { useNavigate } from 'react-router-dom'


function LeftSidebar({isOpen}) {
  const navigate = useNavigate()

  const handleDashboard = () => {
    navigate("/dashboard")
  }

  const handleUsers = () => {
    navigate("/startPage")
  }
  const handleLogout = () => {
    alert("Logout Succesfully")
    sessionStorage.removeItem("loggedIn")
    navigate("/")
  }

  return (
    <>
  <div className={`leftside-menu`}>
  {/* Brand Logo Light */}
    <a href="" className="logo logo-light">       
    <span className="logo-lg">
      <img
        src={logo}
        style={{ width: 150, height: 30 }}
        alt="logo"
        />
    </span>
    <span className="logo-sm">
      <img src={fav} alt="small logo" />
    </span>
    
  </a>
        {/* Sidebar Hover Menu Toggle Button */}
  <div
    className="button-sm-hover"
    data-bs-toggle="tooltip"
    data-bs-placement="right"
    title="Show Full Sidebar"
    >
    <i className="ri-checkbox-blank-circle-line align-middle" />
  </div>
  {/* Full Sidebar Menu Close Button */}
  <div className="button-close-fullsidebar">
    <i className="ri-close-fill align-middle" />
  </div>
  {/* Sidebar -left */}
  <div className="h-100" id="leftside-menu-container" data-simplebar="true">
    {/* Leftbar User */}
    <div className="leftbar-user">
      <a href="#">
        <img
          src="assets/images/users/avatar-1.jpg"
          alt="user-image"
          height={42}
          className="rounded-circle shadow-sm"
          />
      </a>
    </div>
    {/*- Sidemenu */}
    <ul className="side-nav mt-3">
      <li className="side-nav-item">
        <button className="side-nav-link" onClick={handleDashboard}>
          <i className="ri-dashboard-2-line" />
        <span>Dashboard</span>
        </button>
      </li>
      <li className="side-nav-item">
        <button className="side-nav-link" onClick = {handleUsers}>
          <i className="ri-user-add-line" />
         <span>Users</span>
        </button>
      </li>
      <li className="side-nav-item">
        <button className="side-nav-link" onClick = {handleLogout}>
          <i className="ri-logout-box-line" />
          <span>Logout</span>
        </button>
      </li>
    </ul>
    {/*- End Sidemenu */}
    <div className="clearfix" />
  </div>
</div>
     
      </>
  )
}

export default LeftSidebar