import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import {useNavigate } from "react-router-dom";
import "./AccountPage.css";

import Sidebar from "../../components/Sidebar/Sidebar";

const AccountPage = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="accountpage">
      <Sidebar/>
      {/* <div className="up">
        <img src={logo} alt="" />
      </div>
      <div className="mid">
        <div className="section">
        <div className="routes">
          <img src={video_camera_front} alt=".." />
          <NavLink to="/child/stream/:childid" className="link">
            Streams
          </NavLink>
        </div>
        <div className="routes">
          <img src={school} alt=".." />
          <NavLink to="/child" className="link">
            Students
          </NavLink>
        </div>
        <div className="routes">
          <img src={eyeglasses} alt=".." />
          <NavLink to="/devices" className="link">
            Devices
          </NavLink>
        </div>

        <div className="routes">
          <img src={person} alt=".." />
          <NavLink to="/userprofile" className="link">
            Profile
          </NavLink>
        </div>
      </div>
      </div>
      <div className="down">
        <img src={Illustration} alt="" />
  </div>*/}

      <button onClick={handleLogout}>Logout</button> 
    </div>
  );
};

export default AccountPage;
