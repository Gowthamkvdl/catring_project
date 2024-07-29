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
        <p className="text-dark attribution text-center">
          <a className="text-dark" href="https://storyset.com/">
            Illustrations by Storyset
          </a>
          {/* <a
            href="https://www.flaticon.com/free-icons/location"
            title="location icons"
          >
            Location icons created by Freepik - Flaticon
          </a> */}
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
        <p className="text-dark attribution text-center">
          <a className="text-dark" href="https://storyset.com/">
            Illustrations by Storyset
          </a>
        </p>
      </footer>
    </div>
  ); 

};

