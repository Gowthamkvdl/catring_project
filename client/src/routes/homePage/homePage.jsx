import React, { useEffect, useRef, useState } from "react";
import "./homePage.css";
import Input from "../../components/input/input";
import Typed from "typed.js";
import ArrowBtn from "../../components/arrowBtn/arrowBtn";
import { useNavigate, Link } from "react-router-dom";
import profiling from "../../assets/profiling.svg";
import { Fade } from "react-awesome-reveal";

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
      <div className="container ">
        <div className="row h-100lvh ">
          <div className="col-12 col-xl-7">
            <div className="hero-section mt-lg-0 mt-3 flex-column d-flex justify-content-center align-item-center">
              <div className="hero-text">
                <span className="">Effortless</span>
                <span ref={typingText}></span>
              </div>
              <Fade delay={100} triggerOnce>
                <p className=" fs-5 d-none d-md-block">
                  Our platform not only connects catering contractors with
                  skilled server staff but also creates abundant job
                  opportunities for servers.
                </p>
              </Fade>
              <Fade delay={500} triggerOnce>
                <div className="row mx-2 mx-md-0  gap-4 mt-2 ">
                  <div className="col-12 box-shadow col-md-6 glass p-3 ">
                    <h3 className="mb-3">For Server Staff:</h3>
                    <Input />
                  </div>
                  <div className="col-12 box-shadow col-md-5 glass p-3">
                    <h3 className="mb-3">For Contractors:</h3>
                    <ArrowBtn text="Post Event" handleClick={handleClick} />
                  </div>
                </div>
              </Fade>
            </div>
          </div>
          <div className="col-12 col-xl-5 d-flex justify-content-center align-items-center mt-md-0 mt-4">
            <img src={profiling} className="img-fluid homeImg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default homePage;
