import { Link } from "react-router-dom";
import "./featuredProperties.css";

const FeaturedProperties = (props) => {
  const hotelArr = props.hotel;
  const sortingHotels = hotelArr.slice().sort((a, b) => b.rating - a.rating);
  console.log(sortingHotels);
  const topRatedHotels = sortingHotels.slice(0, 3);
  console.log(topRatedHotels);

  return (
    <div className="fp">
      {topRatedHotels.map((hotel) => {
        return (
          <div className="fpItem" key={hotel._id}>
            <img src={hotel.photos[0]} alt="" className="fpImg" />
            <span className="fpName">
              <Link href="./hotels/0" target="_blank">
                {hotel.title}
              </Link>
            </span>
            <span className="fpCity">{hotel.city}</span>
            <span className="fpPrice">
              Starting from ${hotel.cheapestPrice}
            </span>
            {/* <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedProperties;
