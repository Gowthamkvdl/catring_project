import React, { useState } from "react";
import "./newPostPage.css";
import LocationSelector from "../../components/locationSelector/LocationSelector";
import apiRequest from "../../lib/apiRequest.js";
import { Link, useNavigate } from "react-router-dom";
import BackBtn from "../../components/backBtn/BackBtn";
import toast from "react-hot-toast";
import rollingLoading from "../../assets/rollingLoading.svg";


const NewPostPage = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 11.1271225,
    lng: 78.6568942,
  });
  const [error, setError] = useState("");
  const [isLodading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const handlePositionChange = (newPosition) => {
    setCoordinates(newPosition);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eventName = formData.get("eventName").trim();
    const salary = formData.get("salary").trim();
    const city = formData.get("city").trim();
    const workingDays = formData.get("workingDays").trim();
    const startDate = formData.get("startDate").trim();
    const startTime = formData.get("startTime").trim();
    const noOfStaffs = formData.get("noOfStaff").trim();
    const experience = formData.get("experience").trim();
    const vegetableCutting = formData.get("vegetableCutting").trim();
    const busFare = formData.get("busFare").trim();
    const address = formData.get("address").trim();
    const description = formData.get("description").trim();

    try {
      setError("");
      setIsLoading(true);

      if (coordinates.lat === 11.1271225 || coordinates.lng === 78.6568942) {
        toast.error("Please select your location on the map", {
          id: "select location",
        });
        return;
      }

      const post = await apiRequest.post("/post", {
        eventName,
        salary: parseInt(salary, 10),
        city,
        workingDays: parseInt(workingDays, 10),
        startDate,
        startTime,
        noOfStaffsReq: parseInt(noOfStaffs, 10),
        experience,
        vegetableCutting,
        busFare,
        address,
        description,
        latitude: parseFloat(coordinates.lat),
        longitude: parseFloat(coordinates.lng),
      });

      setTimeout(() => {
        navigate(`/${post.data.postId}`);
        toast.success("Your post is now live!");
        setIsLoading(false);
      }, 0);
      
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container newPostPage navbarHeight mb-5">
      <form action="" onSubmit={handleSubmit}>
        <div className="row box-shadow rounded-4 bg-light newPostPage  mx-1">
          <div className="col-12 p-4 col-lg-7">
            <div className="back-bg-white">
              <BackBtn color="black" />
            </div>
            <div className="mb-3">
              <h3 className="title-bg-white">New Event Post</h3>
            </div>
            <div className="mb-3 d-flex gap-3">
              <div className="name flex-fill">
                <label htmlFor="eventName" className="form-label mb-0">
                  Event Name
                </label>
                <input
                  required
                  id="eventName"
                  type="text"
                  name="eventName"
                  className="form-control shadow-none"
                />
              </div>
              <div className="input-group w-50">
                <label htmlFor="salary" className="form-label mb-0 w-100">
                  Salary
                </label>
                <span className="input-group-text">₹</span>
                <input
                  required
                  id="salary"
                  min={200}
                  type="number"
                  className="form-control shadow-none"
                  name="salary"
                />
              </div>
            </div>
            <div className="mb-3 d-flex gap-3">
              <div className="name flex-fill">
                <label htmlFor="city" className="form-label mb-0">
                  City
                </label>
                <input
                  required
                  id="city"
                  type="text"
                  name="city"
                  className="form-control shadow-none"
                  min={today}
                />
              </div>
              <div className="workingHour flex-fill">
                <label htmlFor="workingHours" className="form-label mb-0">
                  Total Working Days
                </label>
                <input
                  required
                  id="workingDays"
                  type="number"
                  className="form-control shadow-none"
                  name="workingDays"
                  min={1}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label for="startDate" className="col-sm-2 col-form-label">
                Start Date
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control shadow-none"
                  id="startDate"
                  name="startDate"
                  min={today}
                ></input>
              </div>
              <label for="startTime" className="col-sm-2 col-form-label">
                Start Time
              </label>
              <div className="col-sm-4">
                <input
                  type="time"
                  className="form-control shadow-none"
                  id="startTime"
                  name="startTime"
                ></input>
              </div>
            </div>
            <div className="mb-3 d-flex gap-3">
              <div className="noOfStaf w-50 flex-fill">
                <label htmlFor="noOfStaff" className="form-label mb-0">
                  No. of Staffs Required
                </label>
                <input
                  required
                  id="noOfStaff"
                  type="number"
                  name="noOfStaff"
                  className="form-control shadow-none"
                  min={1}
                />
              </div>
              <div className="w-50 flex-fill">
                <label htmlFor="vegetableCutting" className="form-label mb-0">
                  Vegetable Cutting
                </label>
                <select
                  defaultValue={"no"}
                  id="vegetableCutting"
                  name="vegetableCutting"
                  className="form-select shadow-none"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
            <div className="mb-3 d-flex gap-3">
              <div className="w-50 flex-fill">
                <label htmlFor="busFare" className="form-label mb-0">
                  Bus Fare
                </label>
                <select
                  defaultValue={"no"}
                  id="busFare"
                  name="busFare"
                  className="form-select shadow-none"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="w-50 flex-fill">
                <label htmlFor="experience" className="form-label mb-0">
                  Experience
                </label>
                <select
                  defaultValue={"no"}
                  id="experience"
                  name="experience"
                  className="form-select shadow-none"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="eventLocation" className="form-label mb-0">
                Event Location (Address)
              </label>
              <textarea
                required
                id="eventLocation"
                name="address"
                className="form-control shadow-none"
                minLength={10}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="eventDescription" className="form-label mb-0">
                Event Description
              </label>
              <textarea
                required
                id="eventDescription"
                name="description"
                className="form-control shadow-none"
              ></textarea>
            </div>
          </div>
          <div className="col-12 p-4 col-lg-5">
            <p className="my-2">
              Select the location by drag and drop the marker
            </p>
            <LocationSelector onPositionChange={handlePositionChange} />
            <div className="opacity-90 coor my-2">
              Current Coordinates: {coordinates.lat}, {coordinates.lng}
            </div>
            <button
              disabled={isLodading}
              type="submit"
              className="btn w-100 fs-4 float-end btn-warning my-2"
            >
              {isLodading && <img src={rollingLoading}></img>}
              {isLodading ? "Posting Event" : "Post Event"}
            </button>
            {error && <span className="content text-dark">{error}</span>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPostPage;
