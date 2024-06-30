import React, { useEffect, useRef, useState } from "react";
import "./homePage.css";
import Input from "../../components/input/input";
import Typed from "typed.js";
import ArrowBtn from "../../components/arrowBtn/arrowBtn";
import { useNavigate, Link } from "react-router-dom";
import profiling from "../../assets/profiling.svg";
import { Fade } from "react-awesome-reveal";
import BgAnimation from "../../components/animatedBg/AnimatedBg"

const homePage = () => {
  const statements = [
    "Effortlessly Bringing Caterers and Servers Together",
    "Effortless Connections for Exceptional Events",
  ];

  const typingText = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(typingText.current, {
      strings: [
        "ly Bringing Caterers and Servers Together.",
        "&nbsp;Connections for Exceptional Events.",
      ],
      typeSpeed: 65,
      backSpeed: 30,
      loop: true,
      smartBackspace: true,
      backDelay: 3000,
      showCursor: false,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault(e.target);
    navigate("new-post");
  };

  return (
    <div className="homePage ">
      <div className=" pb-5">
        <BgAnimation />
        <div className="container ">
          <div className="row ">
            <div className="col-12 col-lg-7">
              <div className="hero-section mt-lg-5 mt-3 flex-column text-light d-flex justify-content-center align-item-center">
                <div className="hero-text">
                  <span className="">Effortless</span>
                  <span ref={typingText}></span>
                </div>
                <Fade delay={500} triggerOnce>
                  <p className=" fs-5 d-none d-md-block">
                    Our platform not only connects catering contractors with
                    skilled server staff but also creates abundant job
                    opportunities for servers.
                  </p>
                </Fade>
                <Fade delay={750} triggerOnce>
                  <div className="row mx-2 mx-md-0 gap-4 mt-2 ">
                    <div className="col-12 col-md-6 glass p-3 ">
                      <h3 className="mb-3">For Server Staff:</h3>
                      <Input />
                    </div>
                    <div className="col-12 col-md-5 glass p-3">
                      <h3 className="mb-3">For Contractors:</h3>
                      <ArrowBtn text="Post Event" handleClick={handleClick} />
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
            <div className="col-12 col-lg-5 ">
              <img src={profiling} className="img-fluid homeImg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row py-4">
          <div className="text-center fs-3 mt-3 mb-4">
            What problem we are solving?
          </div>
          <div className="col-12 col-lg-5 mx-auto p-3 ">
            <div className="">
              <h3 className="text-center title fs-1 mb-3">For Server Staff</h3>
              <p className="content fs-5 text-indend">
                Finding it hard to discover exciting job opportunities in the
                catering industry? Our platform allows you to connect with top
                contractors, showcase your skills, and find work that fits your
                schedule. Streamline your job search and secure the perfect gig
                with ease.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-5 mx-auto p-3">
            <div className="">
              <h3 className="text-center title fs-1 mb-3">For Contractors</h3>
              <p className="content fs-5 text-indend">
                Finding it hard to discover exciting job opportunities in the
                catering industry? Our platform allows you to connect with top
                contractors, showcase your skills, and find work that fits your
                schedule. Streamline your job search and secure the perfect gig
                with ease.
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-3 py-4 d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-6 p-3">
            <img src={profiling} className="img-fluid" alt="" />
          </div>
          <div className="col-12 col-md-6 p-3">
            <div className="text-center fs-3 mt-3 mb-4">
              The Challenges We Address
            </div>
            <div className="mt-4">
              <h1 className="fs-1 mb-3">Our Story</h1>
              <p className="content">
                At CATRING, we effortlessly bridge the gap between catering
                contractors and skilled server staff. Whether you're a server
                seeking exciting job opportunities or a contractor looking for
                top talent, our platform streamlines the process. Connect,
                interact, and find the perfect match with ease, transforming
                your catering experience and securing the ideal gig or staff.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default homePage;
