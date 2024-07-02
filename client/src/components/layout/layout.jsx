import React, { useContext } from "react";
import './layout.css'
import Navbar from "../navbar/navbar";
import { Navigate, Outlet, Link} from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../context/AuthContext";
import ScrollToTop from "../scrollToTop/ScrollToTop";


export function Layout() {
  return (
    <div className="layout">
      <div className="navbar p-0 m-0">
        <Navbar />
        <ScrollToTop />
      </div>
      <div className="">
        <Outlet />
      </div>
      <footer class="footer">
        <ul class="social-icon p-0">
          <li class="social-icon__item">
            <a class="social-icon__link" href="#">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li class="social-icon__item">
            <a class="social-icon__link" href="#">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li class="social-icon__item">
            <a class="social-icon__link" href="#">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li class="social-icon__item">
            <a class="social-icon__link" href="#">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
        <ul class="menu p-0">
          <li class="menu__item">
            <Link className="menu__link" to={"/"}>
              Home
            </Link>
          </li>
          <li class="menu__item">
            <Link className="menu__link" to={"/about"}>
              About
            </Link>
          </li>
          <li class="menu__item">
            <Link className="menu__link" to={"/"}>
              Services
            </Link>
          </li>
          <li class="menu__item">
            <Link className="menu__link" to={"/"}>
              Team
            </Link>
          </li>
          <li class="menu__item">
            <Link className="menu__link" to={"/contact"}>
              Contact
            </Link>
          </li>
        </ul>
        <p>&copy;2024 Catring | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export function AuthLayout() {

  const {currentUser} = useContext(AuthContext);
  

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="layout">
      <div className="navbar p-0 m-0">
        <Navbar />
      </div>
      <div className="">
        <Outlet />
      </div>
      <footer class="footer">
        <div class="waves">
          <div class="wave" id="wave1"></div>
          <div class="wave" id="wave2"></div>
          <div class="wave" id="wave3"></div>
          <div class="wave" id="wave4"></div>
        </div>
        <ul class="social-icon">
          <li class="social-icon__item">
            <a class="social-icon__link" href="#">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li class="social-icon__item">
            <a class="social-icon__link" href="#">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li class="social-icon__item">
            <a class="social-icon__link" href="#">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li class="social-icon__item">
            <a class="social-icon__link" href="#">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
        <ul class="menu">
          <li class="menu__item">
            <Link className="menu__link" to={"/"}>
              Home
            </Link>
          </li>
          <li class="menu__item">
            <Link className="menu__link" to={"/about"}>
              About
            </Link>
          </li>
          <li class="menu__item">
            <Link className="menu__link" to={"/"}>
              Services
            </Link>
          </li>
          <li class="menu__item">
            <Link className="menu__link" to={"/"}>
              Team
            </Link>
          </li>
          <li class="menu__item">
            <Link className="menu__link" to={"/contact"}>
              Contact
            </Link>
          </li>
        </ul>
        <p>&copy;2024 Catring | All Rights Reserved</p>
      </footer>
    </div>
  ); 

};

