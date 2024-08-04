import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

const RatingComponent = ({ editable = true, totalStars = 0, size = 24 }) => {
  const [newRating, setNewRating] = useState(totalStars);

  // const ratingChanged = (newRating) => {
  //   setNewRating(newRating);
  // };

  return (
    <div className="m-0">
      <ReactStars
        count={5}
        // onChange={ratingChanged}
        size={size}
        activeColor="#c5fe00"
        value={totalStars}
        isHalf={true}
        edit={editable}
      />
      {/* <p className="content m-0 mt-0 mx-2">Rating: {newRating}</p> */}
    </div>
  );
};

export default RatingComponent;
