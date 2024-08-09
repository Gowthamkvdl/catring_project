import React, { useContext, useState } from "react";
import "./profileUpdatePage.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import UploadWidget from "../../components/upload/Upload";
import BackBtn from "../../components/backBtn/BackBtn";
import { toast } from "react-hot-toast";
import rollingLoading from "../../assets/rollingLoading.svg";

const profileUpdatePage = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const [changePass, setChangePassword] = useState(false);
  const [isLodaing, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(currentUser.avatar);

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
        toast.error(
          "The password you reentered is not maching with the new password",
          {
            id: "password missmatch",
            duration: 5000,
          }
        );
        return;
      }
    }

    try {
      setIsLoading(true);
      const updatedUser = await apiRequest.put(`/user/${currentUser.userId}`, {
        phone,
        city,
        address,
        password,
        avatar,
      });
      updateUser(updatedUser.data);
      navigate("/profile");
      toast.success("Profile Updated Successfully!", {
        id: "profile update",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  const handleDelete = async () => {
    try {
      await apiRequest.delete("/user/" + currentUser.userId);
      await apiRequest.post("/auth/logout");
      localStorage.removeItem("user");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="updateProfile container navbarHeight">
        <BackBtn color="white" />
        <div className="row">
          <div className="col-12 col-md-7">
            <h2 className="title">
              EDIT PROFILE
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                className={`btn btn-danger float-end`}
              >
                Delete Account
              </button>
            </h2>
            <div className="profile bg-light text-dark mx-2 mx-md-0 py-4 rounded-4 box-shadow mt-4 row">
              <div className="profilePic  d-flex pb-3  pt-2 p-md-0 pb-md-0  flex-column col-12 col-md-4">
                <img
                  src={avatar || dummyProfilePic}
                  alt=""
                  className="img-fluid mb-2 px-md-2 rounded-4"
                />
                <UploadWidget
                  uwConfig={{
                    cloudName: "gowthamk",
                    uploadPreset: "catering",
                    multiple: false,
                    maxImageFileSze: 2000000,
                    folder: "avatar",
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
                  <button
                    disabled={isLodaing}
                    type="submit"
                    className="btn btn-warning float-end "
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      {isLodaing && <img src={rollingLoading}></img>}
                      {isLodaing ? "Updateing" : "Update"}
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 mb-5"></div>
        </div>
      </div>
      <div
        className="modal fade "
        id="staticBackdrop"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-light text-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body h-100">
              Do you want to delete your Account
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete Accounnt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profileUpdatePage;
