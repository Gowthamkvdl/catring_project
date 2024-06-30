import React, { useContext, useState } from "react";
import "./loginPage.css";
import jobHuntSvg from "../../assets/jobImg.svg";
import InputField from "../../components/inputField/inputField";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import BackBtn from "../../components/backBtn/BackBtn";


const loginPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      setError(null);
      setLoading(true);
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      // Set user info in local storage
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log(res.data);
      updateUser(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container navbarHeight">
      <div className="row bg-light rounded-3 mx-1 mb-lg-0 mb-5">
        <div className="col-12 col-lg-6  p-0 p-md-5">
          <img src={jobHuntSvg} alt="" />
        </div>
        <div className="col-12 col-lg-6 p-4 pt-0 p-md-5 form">
          <BackBtn />
          <h1 className="title">Login</h1>
          <form action="" onSubmit={handleSubmit}>
            <InputField
              label={"UserName"}
              inputType={"text"}
              inputName={"username"}
            />
            <InputField
              label={"Password"}
              inputType={"password"}
              inputName={"password"}
            />
            <Link className="float-end mt-2" to={"/register"}>
              Don't have an account?
            </Link>
            <div className="mt-2 opacity-95"></div>
            {error && <span className="">{error}</span>}
            <button
              disabled={loading}
              className="btn btn-warning w-100 my-4 fs-5"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
