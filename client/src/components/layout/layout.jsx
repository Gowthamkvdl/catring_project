import React, { useContext } from "react";
import './layout.css'
import Navbar from "../navbar/navbar";
import { Navigate, Outlet, useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../context/AuthContext";


export function Layout() {
  return (
    <div className="layout">
      <div className="navbar p-0 m-0">
        <Navbar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export function AuthLayout() {

  const {currentUser} = useContext(AuthContext);
  

  return !currentUser ?  (
    <Navigate to="/login" />
  ): (
    <div className="layout">
      <div className="navbar p-0 m-0">
        <Navbar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  ) 

};

