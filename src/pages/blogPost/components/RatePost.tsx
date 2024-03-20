import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

export const RatePost = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => { setIsLoaded(true) }, []);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <div className="App">
      {isLoaded && <Rating initialValue={rating} onClick={handleRating} />}
    </div>
  );
};
