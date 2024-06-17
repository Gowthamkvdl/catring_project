import React from 'react'
import "./profileUpdatePage.css"
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import StarRating from "../../components/startRating/startRating"
import Chat from '../../components/chat/chat';
import { useNavigate } from 'react-router-dom';

const profileUpdatePage = () => {

    const navigate = useNavigate();

    const handleSave = () => {
navigate('/profile')
    }

  return (
    <div>
      <div className="updateProfile container navbarHeight">
        <div className="row pt-3">
          <div className="col-12 col-md-7">
            <h2 className="title">
              USER PROFILE
              <button className="float-end btn btn-yellow" onClick={handleSave}>
                Save
              </button>
            </h2>
            <div className="profile mt-4 row">
              <div className="profilePic col-4">
                <img src={dummyProfilePic} alt="" className="img-fluid mb-2" />
                <StarRating
                  className="stars"
                  editable={false}
                  size={25}
                  totalStars={4.5}
                />
              </div>
              <div className="profileInfo col-8">
                <div className=" content mb-2">
                  User Name :{" "}
                  <input
                    disabled
                    type="text"
                    className="form-control form-control-sm shadow-none"
                    defaultValue={"gowthamkvdl"}
                  />
                </div>
                <div className=" content mb-2">
                  Name :
                  <input
                    type="text"
                    className="form-control form-control-sm shadow-none"
                    defaultValue={"Gowtham K"}
                  />
                </div>
                <div className=" content mb-2">
                  Phone :{" "}
                  <input
                    type="text"
                    className="form-control form-control-sm shadow-none"
                    defaultValue={"+91 7010399378"}
                  />
                </div>
                <div className=" content mb-2">
                  Email :
                  <input
                    type="text"
                    className="form-control form-control-sm shadow-none"
                    defaultValue={"gowthamkvdl@gmail.com"}
                  />
                </div>
                <div className=" content mb-2">
                  City :{" "}
                  <input
                    type="text"
                    className="form-control form-control-sm shadow-none"
                    defaultValue={"Vadalur"}
                  />
                </div>
                <div className=" content mb-2">
                  District :{" "}
                  <input
                    type="text"
                    className="form-control form-control-sm shadow-none"
                    defaultValue={"Cuddalore"}
                  />
                </div>
                <div className=" content mb-2">
                  State :{" "}
                  <input
                    type="text"
                    className="form-control form-control-sm shadow-none"
                    defaultValue={"Tamil Nadu"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5">{/* <Chat /> */}</div>
        </div>
      </div>
    </div>
  );
}

export default profileUpdatePage