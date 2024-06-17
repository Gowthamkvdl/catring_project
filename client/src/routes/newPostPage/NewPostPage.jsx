import React, { useState } from "react";
import "./newPostPage.css";
import LocationSelector from "../../components/locationSelector/LocationSelector";

const NewPostPage = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 11.1271225,
    lng: 78.6568942,
  });

  const handlePositionChange = (newPosition) => {
    setCoordinates(newPosition);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("salary"))
  }

  return (
    <div className="container newPostPage navbarHeight mb-5">
      <form action="" onSubmit={handleSubmit}>
        <div className="row bg-light text-dark newPostPage rounded-3 mx-1">
          <div className="col-12 p-4 col-lg-7">
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
                <input
                  required
                  id="salary"
                  min={200}
                  type="number"
                  className="form-control shadow-none"
                  name="salary"
                />
                <span className="input-group-text">₹</span>
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
                  Total Working Hours
                </label>
                <input
                  required
                  id="workingHours"
                  type="number"
                  className="form-control shadow-none"
                  name="workingHours"
                />
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
                name="eventLocation"
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
                name="eventDescription"
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
            <button type="submit" className="btn float-end btn-yellow my-2">
              Post Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPostPage;
