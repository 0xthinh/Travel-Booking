import { Link, useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = (props) => {
  const navigate = useNavigate();
  // Hàm gửi request đến backend để lấy ra hotel detail
  const getHotelDetail = () => {
    navigate(`/hotels/${_id}`, { state: props.detail });
  };

  const {
    _id,
    name,
    distance,
    tag,
    type,
    description,
    free_cancel,
    cheapestPrice,
    rating,
    rate_text,
    photos,
  } = props.detail;
  return (
    <div className="searchItem">
      <img src={photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siDistance">{distance} from center</span>
        <span className="siTaxiOp">{tag}</span>
        <span className="siSubtitle">{description}</span>
        <span className="siFeatures">{type}</span>
        {/* If can cancel */}
        {free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{rate_text}</span>
          <button>{rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>

          <button onClick={getHotelDetail} className="siCheckButton">
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
