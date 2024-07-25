import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import { Toaster } from "react-hot-toast";
import Theme from "../theme/Theme";

const Navbar = () => {
  const location = useLocation();

  const [bg, setBg] = useState("bg-transperant");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50
        ? setBg("box-shadow")
        : setBg("");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className={`navbar navbar-expand-md ${bg} navbar-dark fixed-top`}>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 4000,
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
          className={`navbar-toggler shadow-none bg-dark`}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`offcanvas h-50 offcanvas-top`}
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title fs-1" id="offcanvasDarkNavbarLabel">
              CATRING
            </h5>
            <button
              type="button"
              className="btn-close custom-dark-btn shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div
            className={`offcanvas-body d-flex justify-content-center align-items-center`}
          >
            <ul className="navbar-nav align-items-center justify-content-end flex-grow-1 pe-md-3">
              <Link to="/">
                <li className={`nav-item mb-1 `}>
                  <div
                    className={`nav-link ${isActive(
                      "/"
                    )} mb-1" aria-current="page`}
                  >
                    Home
                  </div>
                </li>
              </Link>
              <Link to="about">
                <li className={`nav-item mb-1 `}>
                  <div className={`nav-link ${isActive("/about")}`}>About</div>
                </li>
              </Link>
              <Link to="/contact">
                <li className={`nav-item mb-1 `}>
                  <div className={`nav-link ${isActive("/contact")}`}>
                    Contact
                  </div>
                </li>
              </Link>
              <li className="m-2">
                <Theme />
              </li>
              {currentUser ? (
                <Link to="/profile">
                  <div
                    title="Profile"
                    className="ms-3 nav-item userInfo d-flex align-items-center gap-2"
                  >
                    <img
                      src={
                        currentUser.avatar
                          ? currentUser.avatar
                          : dummyProfilePic
                      }
                      className="navProPic"
                      alt=""
                    />
                    <span className="fs-5 text-uppercase">
                      {currentUser.username}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="d-flex flex-column flex-md-row align-items-center">
                  <Link to="/login">
                    <li className="nav-item mb-1 w-100">
                      <div className="nav-link">
                        <button className="btn btn-warning btn-sm">
                          Login
                        </button>
                      </div>
                    </li>
                  </Link>
                  <Link to="/register">
                    <li className="nav-item mb-1">
                      <div className="nav-link">
                        <button className="btn btn-warning btn-sm">
                          Register
                        </button>
                      </div>
                    </li>
                  </Link>
                </div>
              )}
              {/* Uncomment and use the dropdown if needed
              <li className="nav-item mb-1 dropdown">
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
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
