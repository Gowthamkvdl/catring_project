import React, { useState } from "react";
import "./input.css";
import {Link} from "react-router-dom"

const input = () => {
  const [location, setLocation] = useState("");

  return (
    <div>
      <form action="" className="d-flex gap-1 align-items-center flex-row ">
        <input
          type="text"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          className="inputBox text-dark"
          placeholder="Search job by location..."
        />
        <Link to={`\list?location=${location}&minSalary=${""}&date=${""}&maxDutyHours=${""}&limit=${"5"}`} className="link">
          <button class="searchButton">
            <span class="span">🔎</span>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default input;
