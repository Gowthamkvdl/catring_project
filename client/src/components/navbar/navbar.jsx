import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";

const navbar = () => {
  const [bg, setBg] = useState("bg-transperant");
  const { currentUser, updateUser } = useContext(AuthContext);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setBg("bg-darkcolor") : setBg("bg-transperant");
    });
  }, [bg]);

  return (
    <nav className={`navbar navbar-expand-md navbar-dark ${bg} fixed-top`}>
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
          className="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Catring
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav align-items-center justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <Link to={"/"}>Home</Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <Link to={"about"}>About</Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <Link to={"contact"}>Contact</Link>
                </a>
              </li>
              {currentUser ? (
                <Link to={"/profile"}>
                  <div className="ms-3 mt-2 userInfo mb-2 d-flex align-items-center gap-2">
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
                <div className="btn d-flex">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <button className="btn btn-yellow btn-sm">
                        <Link to="login">Login</Link>
                      </button>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <button className="btn btn-yellow btn-sm">
                        <Link to="register">Register</Link>
                      </button>
                    </a>
                  </li>
                </div>
              )}
              {/* <li className="nav-item dropdown">
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
