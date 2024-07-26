import React from "react";
import "./aboutPage.css";
import BackBtn from "../../components/backBtn/BackBtn";
import problemSolving from "../../assets/problem-solving.svg";
import { Fade } from "react-awesome-reveal";

const aboutPage = () => {
  return (
    <div className="about container navbarHeight">
      <div className="wrapper">
        <BackBtn color="light" />
        <h1 className="title">About</h1>
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-6">
              <img src={problemSolving} className="img-fluid " alt="" />
            </div>
            <div className="col-12 col-md-6">
              <div className=" fs-3 mt-3 mb-4">The Challenges We Address</div>
              <Fade triggerOnce duration={500}>
                <div className="mt-4">
                  <h1 className="fs-1 mb-3">Our Story</h1>
                  <p className="content text-indend">
                    At CATRING, we effortlessly bridge the gap between catering
                    contractors and skilled server staff. Whether you're a
                    server seeking exciting job opportunities or a contractor
                    looking for top talent, our platform streamlines the
                    process. Connect, interact, and find the perfect match with
                    ease, transforming your catering experience and securing the
                    ideal gig or staff.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
              <hr className="w-75 text-center mx-auto" />
          <div className="row">
            <div className="text-center fs-3 mt-3 mb-4">
              What problem we are solving?
            </div>
            <div className="col-12 col-lg-5 mx-auto p-3 ">
              <Fade triggerOnce duration={500}>
                <div className="">
                  <h3 className=" title fs-1 mb-3">For Server Staff</h3>
                  <p className="content fs-5 text-indend">
                    Finding it hard to discover exciting job opportunities in
                    the catering industry? Our platform allows you to connect
                    with top contractors, showcase your skills, and find work
                    that fits your schedule. Streamline your job search and
                    secure the perfect gig with ease.
                  </p>
                </div>
              </Fade>
            </div>
            <div className="col-12 col-lg-5 mx-auto p-3">
              <Fade triggerOnce duration={500}>
                <div className="">
                  <h3 className=" title fs-1 mb-3">For Contractors</h3>
                  <p className="content fs-5 text-indend">
                    Finding it hard to discover exciting job opportunities in
                    the catering industry? Our platform allows you to connect
                    with top contractors, showcase your skills, and find work
                    that fits your schedule. Streamline your job search and
                    secure the perfect gig with ease.
                  </p>
                </div>
              </Fade>
            </div>
            <section>
              <h4 className="fs-3 text-center title">A Win-Win for All</h4>
              <p className="text-center content">
                We make event staffing effortless and efficient, empowering
                servers and helping contractors achieve event success.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutPage;
