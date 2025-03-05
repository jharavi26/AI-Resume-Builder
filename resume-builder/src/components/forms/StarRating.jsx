import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ index, item, handleChange }) => {
  const [rating, setRating] = useState(item.rating);
  const [hover, setHover] = useState(0);

  const handleRatingClick = (value) => {
    setRating(value);
    handleChange(index, "rating", value);
  };

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          color={star <= (hover || rating) ? "#ffd700" : "#ccc"} // Change color on hover
          style={{ cursor: "pointer", transition: "color 0.2s" ,
            textShadow:
              star <= (hover || rating)
                ? "0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 223, 0, 0.6)"
                : "none", // Glow effect
          }}

          onClick={() => handleRatingClick(star)}
          onMouseEnter={()=>setHover(star)}
          onMouseLeave={()=>setHover(0)}
        />
      ))}
    </div>
  );
};

export default StarRating;
