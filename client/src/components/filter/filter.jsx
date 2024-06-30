import React, { useEffect } from "react";
import "./filter.css";
import { useSearchParams } from "react-router-dom";

const Filter = ({ query, setQuery, loadMore }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(query);
  }, [query, setSearchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(query);
  };

  const handleReset = () => {
    setQuery({
      location: "",
      date: "",
      maxWorkingDays: "100",
      minSalary: "0",
      limit: "5",
    });
    setSearchParams({});
  };

  return (
    <div className="filter">
      <h4>
        Search result for{" "}
        <span className="text-uppercase">
          {query.location ? query.location : "Tamil Nadu"}
        </span>
      </h4>
      <form action="">
        <div className="row">
          <div className="col-12 mb-2">
            <input
              onChange={handleChange}
              value={query.location}
              placeholder="Search jobs by location..."
              type="text"
              name="location"
              className="form-control shadow-none outline-none"
            />
          </div>
          <div className="col-6">
            <label htmlFor="" className="">
              Min salary
            </label>
            <input
              onChange={handleChange}
              value={query.minSalary}
              min={0}
              name="minSalary"
              type="number"
              className="form-control mb-2 shadow-none outline-none"
            />
          </div>
          <div className="col-6">
            <label htmlFor="" className="">
              Max duty days
            </label>
            <div className="input-group">
              <input
                onChange={handleChange}
                value={query.maxWorkingDays}
                min={0}
                type="number"
                className="form-control shadow-none"
                aria-label="Max duty days"
                name="maxWorkingDays"
              />
              <span className="input-group-text">Days</span>
            </div>
          </div>
          <div className="row mx-auto p-0 d-flex justify-content-center align-items-end">
            <div className="col-6">
              <label htmlFor="" className="">
                Date
              </label>
              <div className="input-group">
                <input
                  onChange={handleChange}
                  value={query.date}
                  min={0}
                  name="date"
                  type="date"
                  className="form-control shadow-none"
                  aria-label="Date"
                />
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() =>
                    setQuery((prevQuery) => ({ ...prevQuery, date: "" }))
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-clockwise"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                    />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              className="btn-group col-6"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-warning w-50 fw-600 shadow-none"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                type="button"
                className="btn btn-secondary fw-600 shadow-none"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;
