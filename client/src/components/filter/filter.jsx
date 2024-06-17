import React from "react";
import "./filter.css";

const filter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("minSalary"));
    console.log(formData.get("maxDutyHours"));
    console.log(formData.get("maxSalary"));
    console.log(formData.get("location"));
  };

  return (
    <div className="filter">
      <h4>Search result for place</h4>
      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4 ">
            <label htmlFor="" className="mt-2">
              Min salary
            </label>
            <input
              min={0}
              name="minSalary"
              type="number"
              className="form-control mb-2 shadow-none outline-none"
            />
          </div>
          <div className="col-4 ">
            <label htmlFor="" className="mt-2">
              Max salary
            </label>
            <input
              min={0}
              name="maxSalary"
              type="number"
              className="form-control  "
            />
          </div>
          <div className="col-4 ">
            <label htmlFor="" className="mt-2">
              Max duty hours
            </label>
            <div class="input-group">
              <input
                min={0}
                type="number"
                class="form-control shadow-none"
                aria-label="Dollar amount (with dot and two decimal places)"
              ></input>
              <span class="input-group-text">hrs</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-9 ">
            <input
              placeholder="Search jobs by location..."
              type="text"
              name="location"
              className="form-control shadow-none outline-none"
            />
          </div>
          <div className="col-3 mx-0">
            <button type="submit" className="btn btn-yellow w-100 px-0 mx-0">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default filter;
