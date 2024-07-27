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
      <footer className="footer">
        <ul className="social-icon p-0">
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
        <ul className="menu p-0">
          <li className="menu__item">
            <Link className="menu__link" to={"/"}>
              Home
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/about"}>
              About
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/"}>
              Services
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/"}>
              Team
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/contact"}>
              Contact
            </Link>
          </li>
        </ul>
        <p className="text-dark text-center">
          &copy;2024 Catring Boys | All Rights Reserved
        </p>
        <p className="text-dark text-center">
          <a href="https://storyset.com/">
            Illustrations by Storyset
          </a>
        </p>
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
      <footer className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon">
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
        <ul className="menu">
          <li className="menu__item">
            <Link className="menu__link" to={"/"}>
              Home
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/about"}>
              About
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/"}>
              Services
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/"}>
              Team
            </Link>
          </li>
          <li className="menu__item">
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

