import React, { useContext } from "react";
import "./profilePage.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import StarRating from "../../components/startRating/startRating";
import Chat from "../../components/chat/chat";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const profilePage = () => {

  const {currentUser, updateUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/update-profile");
  };

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      localStorage.removeItem("user");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile container navbarHeight">
      <div className="row pt-3">
        <div className="col-12 col-md-7">
          <h2 className="title">
            USER PROFILE
            <button className=" ms-2 float-end btn btn-yellow" onClick={handleEdit}>
              Edit
            </button>
            <button className="float-end btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </h2>
          <div className="profile mt-4 row">
            <div className="profilePic col-4">
              <img
                src={dummyProfilePic}
                alt=""
                className="img-fluid mb-2 rounded"
              />
              <div className=" starRating d-flex flex-column align-items-center justify-content-center">
                <StarRating
                  className="stars"
                  editable={false}
                  size={25}
                  totalStars={currentUser.starRating}
                />
                <p className="content m-0 mt-0 mx-2">Rating: {currentUser.starRating <= 0 ? "No rating": currentUser.starRating} </p>
                <span className=" honorScore">
                  Honor Score: <span className="fw-bold">{currentUser.honorScore}</span>
                </span>
              </div>
            </div>
            <div className="profileInfo col-8">
              <div className=" content mb-2">
                User Name : {currentUser.username}
              </div>
              <div className=" content mb-2">Phone : {currentUser.phone}</div>
              <div className=" content mb-2">Email : {currentUser.email}</div>
              <div className=" content mb-2">City : {currentUser.city}</div>
              <div className=" content mb-2">Address : {currentUser.address? currentUser.address : "Not provided"}</div>
            </div>
            <div className="row mt-4">
              <div className="col-6">
                <button className="btn btn-yellow w-100 ">My Events</button>
              </div>
              <div className="col-6">
                <button className="btn btn-yellow w-100 ">Saved Events</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-5">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default profilePage;
