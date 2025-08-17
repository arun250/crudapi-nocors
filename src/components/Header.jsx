import React from 'react'
import logo from "../assets/images/logo.png"

import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import LeftSidebar from "./LeftSidebar"
import initHyperConfig from "./HyperConfig"

function Header({toggleSidebar}) {

const navigate = useNavigate()
  
const handleLogout = () => {
  alert("Logout Succesfully")
  navigate("/")
}
  return (
    <>
<div className='wrapper'>
<div className="navbar-custom">
  <div className="topbar container-fluid">
    <div className="d-flex align-items-center gap-lg-2 gap-1">
          {/* Topbar Brand Logo */}
      <div className="logo-topbar">
        {/* Logo light */}
        <a href="" className="logo-light">
          <span className="logo-lg">
            <img src={logo} alt="logo" />
          </span>
        </a>
      </div>
      {/* Sidebar Menu Toggle Button */}
            <button
                className="button-toggle-menu"
                onClick = {toggleSidebar}
                >
        <i className="mdi mdi-menu" />
      </button>
      <div className="head-text">
        <h4>Welcome User</h4>
      </div>
      {/* Horizontal Menu Toggle Button */}
      <button
        className="navbar-toggle"
        data-bs-toggle="collapse"
        data-bs-target="#topnav-menu-content"
        onClick = {toggleSidebar}
        >
        <div className="lines">
          <span />
          <span />
          <span />
        </div>
      </button>
    </div>
    <ul className="topbar-menu d-flex align-items-center gap-3">
      <li className="dropdown">
        <a
          className="nav-link dropdown-toggle arrow-none nav-user px-2"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false"
          >
          <span className="account-user-avatar">
            <i className="mdi mdi-account-circle font-36 text-white" />
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
          {/* item*/}
          <div className="dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome !</h6>
          </div>
        
          {/* item*/}
          <a href="" className="dropdown-item" onClick={handleLogout}>
            <i className="mdi mdi-logout me-1" />
            <span>Logout</span>
          </a>
        </div>
      </li>
    </ul>
  </div>
</div>
<LeftSidebar/>
            </div>
     
    </>
  )
}

export default Header