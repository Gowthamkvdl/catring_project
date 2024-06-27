import React, { useContext, useState } from "react";
import "./profileUpdatePage.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import UploadWidget from "../../components/upload/Upload";
import BackBtn from "../../components/backBtn/BackBtn";


const profileUpdatePage = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const [changePass, setChangePassword] = useState(false);
  const [isLodaing, setIsLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  const [avatar,setAvatar] = useState(currentUser.avatar)

  const handleSave = async (e) => {
    let password = null;
    e.preventDefault();
    const formData = new FormData(e.target);
    const phone = formData.get("phone");
    const city = formData.get("city");
    const address = formData.get("address");
    const newPassword = formData.get("newPassword");
    const newPassword1 = formData.get("newPassword1");

    if (changePass) {
      if (newPassword === newPassword1) {
        password = newPassword;
      } else {
        setInfo(
          "The password you reentered is not maching with the new password"
        );
        return;
      }
    }

    try {
      setIsLoading(true)
      setError(null)
      const updatedUser = await apiRequest.put(`/user/${currentUser.userId}`, {
        phone,
        city,
        address,
        password,
        avatar
      });
      updateUser(updatedUser.data);
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false)
    }
    
  };

  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div>
      <div className="updateProfile container navbarHeight">
        <BackBtn color="white" />
        <div className="row pt-3">
          <div className="col-12 col-md-7">
            <h2 className="title">
              EDIT USER PROFILE
            </h2>
            <div className="profile mt-4 row">
              <div className="profilePic d-flex p-5 pt-2 pb-3 p-md-0 pb-md-0 flex-column p-5 col-12 col-md-4">
                <img
                  src={avatar || dummyProfilePic}
                  alt=""
                  className="img-fluid mb-2 rounded"
                />
                <UploadWidget uwConfig={{
                  cloudName:"gowthamk",
                  uploadPreset:"catring",
                  multiple:false,
                  maxImageFileSze: 2000000,
                  folder:"avatar"
                }} 
                  setAvatar={setAvatar}
                />
              </div>
              <div className="profileInfo col-12 col-md-8">
                <form action="" onSubmit={handleSave}>
                  <div className=" content mb-2">
                    Phone
                    <input
                      type="text"
                      className="form-control form-control-sm fs-5 shadow-none"
                      defaultValue={currentUser.phone}
                      name="phone"
                    />
                  </div>
                  <div className=" content mb-2">
                    City
                    <input
                      type="text"
                      className="form-control form-control-sm fs-5 shadow-none"
                      defaultValue={currentUser.city}
                      name="city"
                    />
                  </div>
                  <div className=" content mb-3">
                    Address
                    <textarea
                      name="address"
                      className="form-control form-control-sm fs-5 shadow-none"
                    >
                      {currentUser.address}
                    </textarea>
                  </div>
                  {changePass && (
                    <div className="change-password">
                      <div className=" content mb-2 ">
                        Enter your new Password
                        <input
                          type="password"
                          className="form-control form-control-sm fs-5 shadow-none"
                          name="newPassword"
                        />
                      </div>
                      <div className=" content mb-3">
                        Enter your new Password again
                        <input
                          type="password"
                          className="form-control form-control-sm fs-5 shadow-none"
                          name="newPassword1"
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className="cursor-pointer"
                    onClick={() => setChangePassword(!changePass)}
                  >
                    {!changePass ? "Change Password?" : "Don't change Password"}
                  </div>
                  {info && <p className="text-light my-2 fs-6">{info}</p>}
                  {error && <p className="text-light my-2 fs-6">{error}</p>}
                  <button
                    disabled={isLodaing}
                    type="submit"
                    className="btn btn-yellow float-end"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 mb-5"></div>
        </div>
      </div>
    </div>
  );
};

export default profileUpdatePage;
