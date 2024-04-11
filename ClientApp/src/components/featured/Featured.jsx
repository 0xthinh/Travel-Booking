import { useEffect, useState } from "react";
import "./featured.css";
import { useSelector } from "react-redux";

const Featured = (props) => {
  const hotelArr = props.hotel;
  // Đếm số hotel của từng địa điểm
  const propertyCount = (placeName) => {
    let hotelNum = 0;
    hotelArr.forEach((hotel) => {
      if (hotel.city === placeName) {
        hotelNum++;
      }
    });
    return hotelNum;
  };

  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="./City Image/Ha Noi.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{propertyCount("Ha Noi")} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="./City Image/Ho Chi Minh.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{propertyCount("Ho Chi Minh")} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="./City Image/Da Nang.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{propertyCount("Da Nang")} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
