import React from "react";

const ErrorComponent = ({ error }) => {
  return (
    <div>
      <h1>An error occurred</h1>
      <p>{error.message || "Something went wrong!"}</p>
    </div>
  );
};

export default ErrorComponent;
