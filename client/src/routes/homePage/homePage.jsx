import React, { useEffect, useRef, useState } from "react";
import "./homePage.css";
import bgVideo from "../../assets/bg-video.mp4"
import Input from "../../components/input/input";
import Typed from "typed.js";
import ArrowBtn from "../../components/arrowBtn/arrowBtn"
import { useNavigate } from "react-router-dom";


const homePage = () => {
  const statements = [
    "Effortlessly Bringing Caterers and Servers Together",
    "Effortless Connections for Exceptional Events",
  ];

  const typingText = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(typingText.current, {
      strings: [
        "ly Bringing Caterers and Servers Together",
        "&nbsp;Connections for Exceptional Events",
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
  const handleSearch = (e) => {
    e.preventDefault(e.target);
    navigate("list");
  };
  const handleClick = (e) => {
    e.preventDefault(e.target);
    navigate("new-post");
  };

  return (
    <div className="homePage">
      <video className="bg-video" muted loop autoPlay>
        {/* <source src={bgVideo} type="video/mp4" /> */}
      </video>
      <div className="hero-section mt-lg-5 mt-3 flex-column text-light d-flex justify-content-center align-item-center">
        <div className="hero-text text-center">
          <span>Effortless</span>
          <span ref={typingText}></span>
        </div>
        <p className="text-center fs-5 w-50 mx-auto d-none d-md-block">
          Our platform not only connects catering contractors with skilled
          server staff but also creates abundant job opportunities for servers.
        </p>
        <div className="row mx-auto w-90 w-md-75 mt-4 ">
          <div className=" mx-auto col-12 col-md-5  mb-md-0 mb-4 glass p-3 ">
            <h3>For Server Staff:</h3>
            <p className="">
              Discover exciting job opportunities in the catering industry.
              Connect with top contractors, showcase your skills, and find work
              that fits your schedule.
            </p>
            <Input handleSubmit={handleSearch} />
          </div>
          <div className="col-12 mx-auto col-md-5  glass p-3">
            <h3>For Catering Contractors:</h3>
            <p className="">
              Find reliable, experienced servers quickly and ensure your event
              runs smoothly. Browse profiles, check availability, and hire the
              right staff in minutes.
            </p>
            <ArrowBtn text="Post Event" handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default homePage;
