import React from "react";
import "./registerPage.css";
import jobHuntSvg from "../../assets/jobImg.svg";
import InputField from "../../components/inputField/inputField";
import { Link } from "react-router-dom";

const registerPage = () => {

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log(formData.get("name"))
    };


  return (
    <div className="container navbarHeight">
      <div className="row  bg-light rounded-3 mx-1 mb-lg-5 mb-5">
        <div className="col-12 col-lg-6  p-0 p-md-5 d-flex justify-content-center align-items-center">
          <img src={jobHuntSvg} alt="" />
        </div>
        <div className="col-12 col-lg-6 p-4 pt-0 p-md-5 form">
          <h1 className="title">Register</h1>
          <form action="" onSubmit={handleSubmit}>
            <InputField
              label={"Enter Your UserName"}
              inputType={"text"}
              inputName={"name"}
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
            <Link className="float-end mt-2" to={"/login"}>Already have an account?</Link>
            <button className="btn btn-yellow w-100 my-4 fs-5">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default registerPage;
