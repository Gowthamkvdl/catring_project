import React from "react";
import "./input.css";

const input = ({ handleSubmit }) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="d-flex gap-1 align-items-center flex-row "
      >
        <input
          type="text"
          name="text"
          className="inputBox text-dark"
          placeholder="Search job by location..."
        />
        <button class="searchButton">
          <span class="span">🔎</span>
        </button>
      </form>
    </div>
  );
};

export default input;
