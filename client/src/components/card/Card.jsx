import React, { useContext, useEffect, useState } from "react";
import "./card.css";
import StarRating from "../../components/startRating/startRating";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import Progressbar from "../progressBar/Progressbar";
import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

const Card = ({ item }) => {
  const [loaded, setLoaded] = useState(false);
  const date = item.startDate;
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-GB");

  return (
    <div className={`card bg-light rounded-4 mt-3 p-3 d-flex justify-content-between`}>
      <Link className="link" to={"/" + item.postId}>
        {item.user && (
          <div className="userInfo mb-2 fs-5 d-flex align-items-center gap-2">
            <img
              src={item.user.avatar ? item.user.avatar : dummyProfilePic}
              className="cardProPic"
              alt=""
            />
            <span className="text-uppercase fs-6">{item.user.username}</span>
          </div>
        )}
        <div className="eventName text-dark">
          <h4 className="d-flex justify-content-between">
            <span className="event-name">
              {item.eventName}
              <span className="fs-6"> ({formattedDate})</span>
            </span>
            <span className="float-end amount">₹{item.salary}</span>
          </h4>
          <div className="location pb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
            <span className="text-uppercase">{item.city}</span>
          </div>
        </div>
      </Link>
      <div className="content fs-6 mt-1 m-0 mb-2">
        <b className="">Number of Staff Required</b> : {item.noOfStaffsReq}
      </div>
      <div className="eventDesc">{item.description}</div>
      {/* <div className="bar row d-flex justify-content-center align-items-center">
        <div className="col-12">
          <div className="mb-0 mt-2 float-end">
            Status of Recruitment:{" "}
            <b>
              {item.noOfStaffsSatisfied}/{item.noOfStaffsReq}
            </b>
          </div>
          <Progressbar width={item.noOfStaffsSatisfied} />
        </div>
      </div> */}
      <div className="extras">
        <div className="spec d-flex align-items-center gap-2">
          {item.user && (
            <div className="stars d-flex align-items-center">
              <StarRating
                editable={false}
                totalStars={item.user.starRating}
                size={20}
              />
              <span className="stars-count ms-1">
                {item.user.starRating < 1 ? "(New)" : item.user.starRating}
              </span>
            </div>
          )}
          <div className="veg-cutting d-flex align-items-center">
            <svg
              width="30px"
              height="30px"
              viewBox="-2.4 -2.4 28.80 28.80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1"
              transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.096"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M14.7245 11.2754L16 12.4999L10.0129 17.8218C8.05054 19.5661 5.60528 20.6743 3 20.9999L3.79443 19.5435C4.6198 18.0303 5.03249 17.2737 5.50651 16.5582C5.92771 15.9224 6.38492 15.3113 6.87592 14.7278C7.42848 14.071 8.0378 13.4615 9.25644 12.2426L12 9.49822M11.5 8.99787L17.4497 3.04989C18.0698 2.42996 19.0281 2.3017 19.7894 2.73674C20.9027 3.37291 21.1064 4.89355 20.1997 5.80024L19.8415 6.15847C19.6228 6.3771 19.3263 6.49992 19.0171 6.49992H18L16 8.49992V8.67444C16 9.16362 16 9.40821 15.9447 9.63839C15.8957 9.84246 15.8149 10.0375 15.7053 10.2165C15.5816 10.4183 15.4086 10.5913 15.0627 10.9372L14.2501 11.7498L11.5 8.99787Z"
                  stroke="#000000"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-capitalize">{item.vegetableCutting}</span>
          </div>
          <div className="travel-amount d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bus-front-fill mt-1 mx-1"
              viewBox="0 0 16 16"
            >
              <path d="M16 7a1 1 0 0 1-1 1v3.5c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.5 2.5 0 0 1-1-2V8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1V2.64C1 1.452 1.845.408 3.064.268A44 44 0 0 1 8 0c2.1 0 3.792.136 4.936.268C14.155.408 15 1.452 15 2.64V4a1 1 0 0 1 1 1zM3.552 3.22A43 43 0 0 1 8 3c1.837 0 3.353.107 4.448.22a.5.5 0 0 0 .104-.994A44 44 0 0 0 8 2c-1.876 0-3.426.109-4.552.226a.5.5 0 1 0 .104.994M8 4c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m-3 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0m8 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-7 0a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1" />
            </svg>
            <span className="text-capitalize">{item.busFare}</span>
          </div>
        </div>

        <div className="mx-2 float-end">
          <span className="post-time">{format(item.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
