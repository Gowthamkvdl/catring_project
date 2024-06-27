import React, { useState } from "react";
import "./newPostPage.css";
import LocationSelector from "../../components/locationSelector/LocationSelector";
import apiRequest from "../../lib/apiRequest.js";
import { Link, useNavigate } from "react-router-dom";
import BackBtn from "../../components/backBtn/BackBtn";

const NewPostPage = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 11.1271225,
    lng: 78.6568942,
  });
  const [days, setDays] = useState(0);
  const [error, setError] = useState("");
  const [isLodading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePositionChange = (newPosition) => {
    setCoordinates(newPosition);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eventName = formData.get("eventName");
    const salary = formData.get("salary");
    const city = formData.get("city");
    const workingDays = formData.get("workingDays");
    const startDate = formData.get("startDate");
    const startTime = formData.get("startTime");
    const noOfStaffs = formData.get("noOfStaff");
    const experience = formData.get("experience");
    const vegetableCutting = formData.get("vegetableCutting");
    const busFare = formData.get("busFare");
    const address = formData.get("address");
    const description = formData.get("description");

    try {
      setError("");
      setIsLoading(true);
      const post = await apiRequest.post("/post", {
        eventName,
        salary: parseInt(salary),
        city,
        workingDays: parseInt(workingDays),
        startDate,
        startTime,
        noOfStaffsReq: parseInt(noOfStaffs),
        experience,
        vegetableCutting,
        busFare,
        address,
        description,
        latitude: parseFloat(coordinates.lat),
        longitude: parseFloat(coordinates.lng),
      });
      navigate(`/${post.data.postId}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
      setError("Some Error Occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container newPostPage navbarHeight mb-5">
      <form action="" onSubmit={handleSubmit}>
        <div className="row bg-light text-dark newPostPage rounded-3 mx-1">
          <div className="col-12 p-4 col-lg-7">
            <BackBtn />
            <div className="mb-3">
              <h3 className="title">New Event Post</h3>
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
              <div className="input-group w-25">
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
                  defaultValue={days}
                  onChange={(e) => setDays(e.target.value - 1)}
                  min={0}
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
                />
              </div>
              <div className="w-50 flex-fill">
                <label htmlFor="vegetableCutting" className="form-label mb-0">
                  Vegetable Cutting
                </label>
                <select
                  required
                  id="vegetableCutting"
                  name="vegetableCutting"
                  className="form-select shadow-none"
                >
                  <option></option>
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
                  required
                  id="busFare"
                  name="busFare"
                  className="form-select shadow-none"
                >
                  <option></option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="w-50 flex-fill">
                <label htmlFor="experience" className="form-label mb-0">
                  Experience
                </label>
                <select
                  required
                  id="experience"
                  name="experience"
                  className="form-select shadow-none"
                >
                  <option></option>
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
              className="btn w-100 fs-4 float-end btn-yellow my-2"
            >
              Post Event
            </button>
            {error && <span className="content text-dark">{error}</span>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPostPage;
