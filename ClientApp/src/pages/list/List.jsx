import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const destinationRef = useRef("");
  const roomRef = useRef("");

  const [suitableList, setSuitableList] = useState([]);

  // Đề bài yêu cầu lọc ra các hotel đủ 3 tiêu chí:
  // 1. Đúng thành phố
  // 2. Trong thời gian đó còn phòng trống (không khả thi vì database không có data về thời gian trống)
  // 3. Đáp ứng đủ số lượng người và phòng
  // => Phải gửi về backend các thông số là {city,people,room} //bỏ qua date

  // Gửi request đến backend để lấy data về hotels theo điều kiện
  useEffect(() => {
    const getSuitableHotels = async () => {
      const res = await fetch("http://localhost:5000/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: destination,
          roomCount: options.room,
        }),
      });
      const result = await res.json();
      console.log(result);
      setSuitableList(result);
    };
    getSuitableHotels();
  }, [destination, options]);

  // Xử lý khi thay đổi thông số trong bảng Search

  const changeParamsHandler = (e) => {
    e.preventDefault();
    setDestination(destinationRef.current.value);
    setOptions({ ...options, roomCount: Number(roomRef.current.value) });
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                ref={destinationRef}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    ref={roomRef}
                  />
                </div>
              </div>
            </div>
            <button onClick={changeParamsHandler}>Search</button>
          </div>
          <div className="listResult">
            {/* forEach HERE */}
            {!suitableList.success && <p>{suitableList.message}</p>}
            {suitableList.success &&
              suitableList.message.map((hotel) => {
                console.log(hotel);
                return <SearchItem detail={hotel} />;
              })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
