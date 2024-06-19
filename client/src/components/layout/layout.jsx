import React from "react";
import './layout.css'
import Navbar from "../navbar/navbar";
import { Outlet } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";


const Layout = () => {
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

export default Layout;
