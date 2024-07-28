import React from 'react'
import "./loader.css"

const Loader = ({message="Loading...", textColor = "light"}) => {
  return (
    <div className='mt-5 '>
      <div className=" w-50 mx-auto line-wobble"></div>
      <div className={`content fs-5 loading-message text-center mt-2`}>
        {message}
      </div>
    </div>
  );
}

export default Loader