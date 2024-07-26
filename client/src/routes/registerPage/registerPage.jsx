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

    try {
      setLoading(true);
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        phone,
        age,
        city,
        password,
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
          <BackBtn color="black"/>
          <h1 className="title-bg-white">Register</h1>
          <form action="" onSubmit={handleSubmit}>
            <InputField
              label={"Enter Your UserName"}
              inputType={"text"}
              inputName={"username"}
            />
            <InputField
              label={"Enter Your Email"}
              inputType={"text"}
              inputName={"email"}
            />
            <InputField
              label={"Enter Your Phone"}
              inputType={"text"}
              inputName={"phone"}
            />
            <InputField
              label={"Enter Your Age"}
              inputType={"number"}
              inputName={"age"}
            />
            <InputField
              label={"Enter Your City"}
              inputType={"text"}
              inputName={"city"}
            />
            <InputField
              label={"Enter Password"}
              inputType={"password"}
              inputName={"password"}
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
