import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import { Toaster } from "react-hot-toast";

const navbar = () => {
  const [bg, setBg] = useState("bg-transperant");
  const { currentUser, updateUser } = useContext(AuthContext);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setBg("bg-darkcolor") : setBg("bg-transperant");
    });
  }, [bg]);


  return (
    <nav className={`navbar navbar-expand-md ${bg} navbar-dark fixed-top`}>
      <Toaster
        position="top-center"
        toastOptions={{
          // Define default options
          className: "",
          duration: 4000,
          // Default options for specific types
          success: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="container">
        <a className="navbar-brand fw-bold fs-3" href="/">
          CATRING
        </a>
        <button
          className="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas w-75 offcanvas-start text-bg-dark"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header ">
            <h5 className="offcanvas-title fs-1" id="offcanvasDarkNavbarLabel">
              CATRING
            </h5>
            <button
              type="button"
              className="btn-close custom-dark-btn  shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body d-flex justify-content-center align-items-center">
            <ul className="navbar-nav align-items-center justify-content-end flex-grow-1 pe-md-3">
              <Link to={"/"}>
                <li className="nav-item mb-1">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
              </Link>
              <Link to={"about"}>
                <li className="nav-item mb-1">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
              </Link>
              <Link to={"/contact"}>
                <li className="nav-item mb-1">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </Link>
              {currentUser ? (
                <Link to={"/profile"} >
                  <div className="ms-3 userInfo mb-1 d-flex align-items-center gap-2">
                    <img
                      src={
                        currentUser.avatar
                          ? currentUser.avatar
                          : dummyProfilePic
                      }
                      className="navProPic"
                      alt=""
                    />
                    <span className="fs-6 text-uppercase">
                      {currentUser.username}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="d-flex flex-column flex-md-row align-items-center">
                  <Link to={"/login"}>
                    <li className="nav-item mb-1 w-100">
                      <a className="nav-link" href="#">
                        <button className="btn btn-warning btn-sm">
                          Login
                        </button>
                      </a>
                    </li>
                  </Link>
                  <Link to="/register">
                    <li className="nav-item mb-1">
                      <a className="nav-link" href="#">
                        <button className="btn btn-warning btn-sm">
                          Register
                        </button>
                      </a>
                    </li>
                  </Link>
                </div>
              )}
              {/* <li className="nav-item mb-1 dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider"></hr>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default navbar;