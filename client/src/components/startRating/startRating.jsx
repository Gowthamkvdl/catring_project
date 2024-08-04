import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

const RatingComponent = ({ editable = true, totalStars = 0, size = 24, onRatingChange }) => {
  const [newRating, setNewRating] = useState(totalStars);
  const [rating, setRating] = useState(totalStars);

  useEffect(() => {
    setRating(totalStars);
  }, [totalStars]);

  const ratingChanged = (newRating) => {
    setNewRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating); // Trigger the callback with the new rating
    }
  };

  return (
    <div className="m-0">
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={size}
        activeColor="#c5fe00"
        value={totalStars}
        isHalf={true}
        edit={editable}
      />
      { editable && <p className="text-center m-0 mt-0 mx-2">Rating: {newRating}</p>}
    </div>
  );
};

export default RatingComponent;
