import React from "react";
import "./singlePage.css";
import dummyProfile from "../../assets/dummyProfilePic.jpg";
import Progressbar from "../../components/progressBar/Progressbar";
import SinglePointerMap from "../../components/singlePointerMap/SinglePointerMap";
import { Link, useLoaderData, useRouteError } from "react-router-dom";

const SinglePage = () => {

  const post = useLoaderData();

  return (
    <div className="singlePage  navbarHeight container">
      <div className="row text-dark mx-1 p-3 rounded-3 bg-light">
        <div className="col-md-7 col-12 h-auto">
          <div className="row">
            <div className="col-12">
              <Link className="link" to={"/user-profile"}>
                <div className="user d-flex align-items-center">
                  <img
                    src={post.user.avatar ? post.user.avatar : dummyProfile}
                    className="navProPic"
                    alt=""
                  />
                  <span className="name mx-2 fs-5 text-uppercase">{post.user.username}</span>
                </div>
              </Link>
              <h4 className="mt-3">
                {post.eventName}
                <div className="float-end fw-bold bg-text text-dark p-1 rounded">
                  ₹{post.salary}
                </div>
              </h4>
              <div className="location mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi mb-1 bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                <span className="text-dark">{post.city}</span>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
          <div className="eventDesc content">
            {post.description}
            <div className="fs-6 my-2">
              <b>Address</b> : {post.address}
            </div>
          </div>
          <div className="bar row d-flex align-items-center">
            <div className="col-md-9 col-12">
              <div className="mb-0 mt-2 float-end">
                Status of Recruitment:{" "}
                <b>
                  {post.noOfStaffsSatisfied}/{post.noOfStaffsReq}
                </b>
              </div>
              <Progressbar width={post.noOfStaffsSatisfied} />
            </div>
            <div className="col-md-3 col-12">
              <div className="join-btn">
                <button className="btn btn-yellow w-100">Join Now</button>
              </div>
            </div>
          </div>
          <div className="extra d-flex gap-md-4 gap-1 flex-wrap my-3">
            <div className="workingHrs bg-text small-text p-2 rounded">
              Date : <b>{post.startDate} </b>
            </div>
            <div className="workingHrs bg-text small-text p-2 rounded">
              TIme : <b>{post.startTime} </b>
            </div>
            <div className="workingHrs bg-text small-text p-2 rounded">
              {/* <svg
                width="26px"
                height="26px"
                viewBox="-5.04 -5.04 34.08 34.08"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
                stroke-width="0.576"
                transform="matrix(-1, 0, 0, 1, 0, 0)"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                    fill="#0F0F0F"
                  ></path>{" "}
                  <path
                    d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                    fill="#0F0F0F"
                  ></path>{" "}
                </g>
              </svg> */}
              Total Working Days :{" "}
              <b>
                {post.workingDays}
              </b>
            </div>
            <div className="transport bg-text small-text p-2 rounded">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bus-front-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 7a1 1 0 0 1-1 1v3.5c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.5 2.5 0 0 1-1-2V8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1V2.64C1 1.452 1.845.408 3.064.268A44 44 0 0 1 8 0c2.1 0 3.792.136 4.936.268C14.155.408 15 1.452 15 2.64V4a1 1 0 0 1 1 1zM3.552 3.22A43 43 0 0 1 8 3c1.837 0 3.353.107 4.448.22a.5.5 0 0 0 .104-.994A44 44 0 0 0 8 2c-1.876 0-3.426.109-4.552.226a.5.5 0 1 0 .104.994M8 4c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m-3 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0m8 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-7 0a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1" />
              </svg> */}
              Travel Amount : <b>{post.busFare}</b>
            </div>
            <div className="vegetables-cutting bg-text small-text p-2 rounded">
              {/* <svg
                width="30px"
                height="30px"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-1"
                transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.096"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M14.7245 11.2754L16 12.4999L10.0129 17.8218C8.05054 19.5661 5.60528 20.6743 3 20.9999L3.79443 19.5435C4.6198 18.0303 5.03249 17.2737 5.50651 16.5582C5.92771 15.9224 6.38492 15.3113 6.87592 14.7278C7.42848 14.071 8.0378 13.4615 9.25644 12.2426L12 9.49822M11.5 8.99787L17.4497 3.04989C18.0698 2.42996 19.0281 2.3017 19.7894 2.73674C20.9027 3.37291 21.1064 4.89355 20.1997 5.80024L19.8415 6.15847C19.6228 6.3771 19.3263 6.49992 19.0171 6.49992H18L16 8.49992V8.67444C16 9.16362 16 9.40821 15.9447 9.63839C15.8957 9.84246 15.8149 10.0375 15.7053 10.2165C15.5816 10.4183 15.4086 10.5913 15.0627 10.9372L14.2501 11.7498L11.5 8.99787Z"
                    stroke="#000000"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg> */}
              Vegetables Cutting : <b>{post.vegetableCutting}</b>
            </div>

            <div className="experence bg-text small-text p-2 rounded">
              Experience : <b>{post.experience}</b>
            </div>
          </div>
        </div>
        <div className="col-md-5 col-12 h-auto">
          <div className="single-page-contact">
            <h4>Contact</h4>
            <p className="m-0">Phone: {post.user.phone}</p>
            <p className="m-0 mb-2 pb-5">Email: {post.user.email}</p>
          </div>
          <div className="spm">
            <SinglePointerMap
              latitude={post.latitude}
              longitude={post.longitude}
            />
          </div>
          <div className="btns d-flex gap-2 mt-2">
            <div className="chat w-100">
              <button className="btn w-100 btn-yellow">Send Message</button>
            </div>
            <div className="save w-100">
              <button className="btn w-100 btn-yellow">Save Event</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
