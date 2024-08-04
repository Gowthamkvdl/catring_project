import React, { useState } from "react";
import "./registerPage.css";
import jobHuntSvg from "../../assets/jobImg.svg";
import InputField from "../../components/inputField/inputField";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";
import BackBtn from "../../components/backBtn/BackBtn"
import { toast } from "react-hot-toast";

const registerPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const age = formData.get("age").trim();
    const city = formData.get("city").trim();
    const password = formData.get("password").trim();
    const totalRatings = 0;
    const averageRating = 0;
    // console.log(username)
    // console.log(email)
    // console.log(phone)
    // console.log(age)
    // console.log(city)
    // console.log(password)

    try {
      setLoading(true);
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        phone,
        age,
        city,
        password,
        totalRatings,
        averageRating
      });
      navigate("/login");
      toast.success("Registered successfully! Login to continue.");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container navbarHeight">
      <div className="row box-shadow bg-light rounded-4 mx-1 mb-lg-5 mb-5">
        <div className="col-12 col-lg-6  p-0 p-md-5 d-flex justify-content-center align-items-center">
          <img src={jobHuntSvg} alt="" />
        </div>
        <div className="col-12 col-lg-6 p-4 pt-0 p-md-5 form">
          <BackBtn color="black" />
          <h1 className="title-bg-white">Register</h1>
          <form action="" onSubmit={handleSubmit}>
            <InputField
              label={"UserName"}
              inputType={"text"}
              inputName={"username"}
              minLength={3}
              maxLength={15}
              pattern={"^\\s*[a-zA-Z0-9_]+\\s*$"}
              title={
                "Username should be 3-15 characters long and can only contain letters, numbers, and underscores. No spaces or special symbols are allowed."
              }
            />

            <InputField
              label={"Email"}
              inputType={"email"}
              inputName={"email"}
            />
            <InputField
              label={"Phone"}
              inputType={"text"}
              inputName={"phone"}
              minLength={10}
              maxLength={10}
            />
            <InputField
              label={"Age"}
              inputType={"number"}
              inputName={"age"}
              min={18}
            />
            <InputField
              label={"City"}
              inputType={"text"}
              inputName={"city"}
            />
            <InputField
              label={"Password"}
              inputType={"password"}
              inputName={"password"}
              minLength={8}
            />
            <Link className="float-end mt-2" to={"/login"}>
              Already have an account?
            </Link>
            <button
              disabled={loading}
              className="btn btn-warning w-100 my-4 fs-5"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default registerPage;
