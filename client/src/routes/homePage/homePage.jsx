import React, { useEffect, useRef, useState } from "react";
import "./homePage.css";
import Input from "../../components/input/input";
import Typed from "typed.js";
import ArrowBtn from "../../components/arrowBtn/arrowBtn";
import { useNavigate, Link } from "react-router-dom";
import profiling from "../../assets/profiling.svg";
import { Slide, Bounce, Flip, Fade, Hinge, JackInTheBox, Roll, Rotate, Zoom} from "react-awesome-reveal";

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
      <div className="bg-gradient pb-5">
        <div className="container ">
          <div className="row ">
            <div className="col-12 col-lg-7">
              <div className="hero-section mt-lg-5 mt-3 flex-column text-light d-flex justify-content-center align-item-center">
                <div className="hero-text">
                  <span className="">Effortless</span>
                  <span ref={typingText}></span>
                </div>
                <p className=" fs-5 d-none d-md-block">
                  Our platform not only connects catering contractors with
                  skilled server staff but also creates abundant job
                  opportunities for servers.
                </p>
                <div className="row mx-2 mx-md-0 gap-4 mt-2 ">
                  <div className="col-12 col-md-6 glass p-3 ">
                    <h3 className="mb-3">For Server Staff:</h3>
                    {/* <p className="">
                    Discover exciting job opportunities in the catering
                    industry. Connect with top contractors, showcase your
                    skills, and find work that fits your schedule.
                  </p> */}
                    <Input />
                  </div>
                  <div className="col-12 col-md-5 glass p-3">
                    <h3 className="mb-3">For Contractors:</h3>
                    {/* <p className="">
                    Find reliable, experienced servers quickly and ensure your
                    event runs smoothly. Browse profiles, check availability,
                    and hire the right staff in minutes.
                  </p> */}
                    <ArrowBtn text="Post Event" handleClick={handleClick} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 ">
              <img src={profiling} className="img-fluid w-100 homeImg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row mx-2 rounded-5 px-1 py-4">
          <JackInTheBox>
          <div className="text-center fs-3 mt-3 mb-5">
            What problem we are solving?
          </div>
          </JackInTheBox>
          <div className="col-12 col-lg-5 mx-auto p-3 ">
            <Slide>
              <div className="">
                <h3 className="text-center fs-1 mb-3">For Server Staff</h3>
                <p className="content fs-5">
                  Finding it hard to discover exciting job opportunities in the
                  catering industry? Our platform allows you to connect with top
                  contractors, showcase your skills, and find work that fits
                  your schedule. Streamline your job search and secure the
                  perfect gig with ease.
                </p>
              </div>
            </Slide>
          </div>
          <div className="col-12 col-lg-5 mx-auto p-3">
            <Slide direction="right">
              <div className="">
                <h3 className="text-center fs-1 mb-3">For Contractors</h3>
                <p className="content fs-5">
                  Struggling to find reliable and experienced servers for your
                  events? Our platform connects you with qualified servers
                  quickly, ensuring your event runs smoothly. Easily browse
                  profiles, check availability, and hire the right staff in
                  minutes.
                </p>
              </div>
            </Slide>
          </div>
        </div>
      </div>
    </div>
  );
};

export default homePage;
