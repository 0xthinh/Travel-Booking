import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openBookingForm, setOpenBookingForm] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const detail = location.state;
  console.log(detail);
  const {
    _id,
    name,
    title,
    address,
    distance,
    tag,
    type,
    desc,
    free_cancel,
    cheapestPrice,
    rating,
    rate_text,
    photos,
  } = detail;

  // Hàm mở to ảnh
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  // Hàm xử lý click vào từng ảnh
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  // Check xem đã login chưa và mở form điền detail
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const openBookingFormHandler = () => {
    if (currentUser) {
      setOpenBookingForm(!openBookingForm);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button onClick={openBookingFormHandler} className="bookNow">
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">{name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            {`Book a stay over $${cheapestPrice} at this property and get a free airport taxi`}
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{title}</h1>
              <p className="hotelDesc">{desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>You gonna love it</h1>
              <span>This description does not appear in given database</span>
              <h2>
                <b>${cheapestPrice}</b>
              </h2>
              <button onClick={openBookingFormHandler}>
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        {openBookingForm && <BookingForm detail={detail} user={currentUser} />}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
