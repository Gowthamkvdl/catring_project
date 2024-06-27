import React, { useContext, useState } from "react";
import "./singlePage.css";
import dummyProfile from "../../assets/dummyProfilePic.jpg";
import Progressbar from "../../components/progressBar/Progressbar";
import SinglePointerMap from "../../components/singlePointerMap/SinglePointerMap";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import apiRequest from "../../lib/apiRequest.js";
import BackBtn from "../../components/backBtn/BackBtn";

const SinglePage = () => {
  const post = useLoaderData();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(post.isSaved)
  const [isLoading, setIsLoading] = useState(false)
  const {currentUser} = useContext(AuthContext)

  const handleSave = async () => {
    setSaved((prev) => !prev)
    if(!currentUser){
      navigate("/login")
    }
    try {
      setIsLoading(true)
      await apiRequest.post("user/save",{postId: post.postId})
    } catch (error) {
      console.log(error)
    setSaved((prev) => !prev);

    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="singlePage navbarHeight container">
      <div className="row text-dark mx-1 p-3 rounded-3 bg-light">
        <div className="col-md-7 col-12 h-auto">
            <BackBtn color={"black"}/>
          <div className="row">
            <div className="col-12">
              <Link className="link" to={"/user-profile"}>
                <div className="user d-flex align-items-center">
                  <img
                    src={post.user.avatar ? post.user.avatar : dummyProfile}
                    className="navProPic"
                    alt=""
                  />
                  <span className="name mx-2 fs-5 text-uppercase">
                    {post.user.username}
                  </span>
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
              Total Working Days : <b>{post.workingDays}</b>
            </div>
            <div className="transport bg-text small-text p-2 rounded">
              Travel Amount : <b>{post.busFare}</b>
            </div>
            <div className="vegetables-cutting bg-text small-text p-2 rounded">
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
              <button className="btn w-100 btn-yellow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-send me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                </svg>
                Send Message
              </button>
            </div>
            <div className="save w-100">
              <button desabled={isLoading} className="btn w-100 btn-yellow" onClick={handleSave}>
                {saved ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-bookmark-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill=""
                    class="bi bi-bookmark me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                  </svg>
                )}
                {saved ? "Event Saved" : "Save Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
