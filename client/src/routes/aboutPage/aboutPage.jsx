import React from "react";
import "./aboutPage.css";
import BackBtn from "../../components/backBtn/BackBtn";


const aboutPage = () => {
  return (
    <div className="about container navbarHeight">
      <div className="wrapper">
      <BackBtn color="white" />
        <h1 className="title">About</h1>
        <section className="mt-4" >
          <h2>Empowering Opportunities for Servers</h2>
          <p className="content">
            Our platform not only connects catering contractors with skilled
            server staff but also creates abundant job opportunities for
            servers.
          </p>
        </section>
        <section>
          <h4>For Catering Contractors:</h4>
          <p className="content">
            Find reliable, experienced servers quickly and ensure your event
            runs smoothly. Browse profiles, check availability, and hire the
            right staff in minutes.
          </p>
        </section>
        <section>
          <h4>For Server Staff:</h4>
          <p className="content">
            Discover exciting job opportunities in the catering industry.
            Connect with top contractors, showcase your skills, and find work
            that fits your schedule.
          </p>
        </section>
        <section>
          <h4>A Win-Win for All</h4>
          <p className="content">
            We make event staffing effortless and efficient, empowering servers
            and helping contractors achieve event success.
          </p>
        </section>
      </div>
    </div>
  );
};

export default aboutPage;
