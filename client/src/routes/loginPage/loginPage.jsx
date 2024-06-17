import React from "react";
import "./loginPage.css";
import jobHuntSvg from "../../assets/jobImg.svg";
import InputField from "../../components/inputField/inputField";
import { Link } from "react-router-dom";

const loginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("name"));
  };

  return (
    <div className="container navbarHeight">
      <div className="row bg-light rounded-3 mx-1 mb-lg-0 mb-5">
        <div className="col-12 col-lg-6  p-0 p-md-5">
          <img src={jobHuntSvg} alt="" />
        </div>
        <div className="col-12 col-lg-6 p-4 pt-0 p-md-5 form">
          <h1 className="title">Login</h1>
          <form action="" onSubmit={handleSubmit}>
            <InputField
              label={"UserName"}
              inputType={"text"}
              inputName={"name"}
            />
            <InputField
              label={"Password"}
              inputType={"password"}
              inputName={"password"}
            />
            <Link className="float-end mt-2" to={"/register"}>
              Don't have an account?
            </Link>
            <button className="btn btn-yellow w-100 my-4 fs-5">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
