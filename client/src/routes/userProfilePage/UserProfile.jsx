import React from "react";
import "./userProfile.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import StarRating from "../../components/startRating/startRating";
import Chat from "../../components/chat/chat";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/update-profile");
  };

  return (
    <div className="profile container navbarHeight">
      <div className="row pt-3">
        <div className="col-12 col-md-7">
          <h2 className="title">
            Gowtham's PROFILE
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
                  totalStars={4.5}
                />
                <p className="content m-0 mt-0 mx-2">Rating: {} </p>
                <span className=" honorScore">
                  Honor Score: <span className="fw-bold">100</span>
                </span>
              </div>
            </div>
            <div className="profileInfo col-8">
              <div className=" content mb-2">User Name : gowthamkvdl</div>
              <div className=" content mb-2">Name : Gowtham K</div>
              <div className=" content mb-2">Phone : 7010399378</div>
              <div className=" content mb-2">Email : gowthamkvdl@gmail.com</div>
              <div className=" content mb-2">City : Vadalur</div>
              <div className=" content mb-2">District : Cuddalore</div>
              <div className=" content mb-2">State : Tamilnadu</div>
            </div>
            <div className="row mt-4">
              <div className="col-6">
                <button className="btn btn-yellow w-100 ">Send Message</button>
              </div>
              <div className="col-6">
                <button className="btn btn-yellow w-100 ">Save User</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
