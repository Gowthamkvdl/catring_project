import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackBtn = ({ color = 'black', link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link ? link : -1);
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-link fit-content p-0 m-0 shadow-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill={color}
        className="bi bi-arrow-left float-start mb-2"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
        />
      </svg>
    </button>
  );
};

export default BackBtn