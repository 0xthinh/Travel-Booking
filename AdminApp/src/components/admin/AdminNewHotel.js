import { Fragment, useState, useEffect, useRef } from "react";
import classes from "./AdminNewHotel.module.css";
import { Link } from "react-router-dom";
import SideBar from "../../pages/Admin/SideBar";
const AdminNewHotel = () => {
  const [hotelArr, setHotelArr] = useState([]);
  const [roomArr, setRoomArr] = useState([]);

  // Get các room sẵn có trong database
  // Phần này đề bài yêu cầu admin điền rooms nhưng thế là vô lý
  // nên show tất cả các room sẵn có ra để admin lựa chọn

  useEffect(() => {
    const getRooms = async () => {
      const res = await fetch("http://localhost:5000/get-room");
      const result = await res.json();
      console.log(result);
      setRoomArr(result);
    };
    getRooms();
  }, []);

  const [selectedRoomArr, setSelectedRoomArr] = useState([]);
  const handleCheckboxChange = (e) => {
    const selectedRoom = roomArr.find((item) => item._id === e.target.value);
    if (e.target.checked) {
      console.log(e.target.value);
      selectedRoomArr.push(selectedRoom);
      console.log(selectedRoomArr);
    } else if (!e.target.checked) {
      setSelectedRoomArr(
        selectedRoomArr.filter((item) => item._id !== e.target.value)
      );
    }
  };

  // useRef để get value của input khác
  const nameRef = useRef("");
  const typeRef = useRef("");
  const cityRef = useRef("");
  const addressRef = useRef("");
  const distanceRef = useRef("");
  const titleRef = useRef("");
  const descRef = useRef("");
  const priceRef = useRef("");
  const imagesRef = useRef("");
  const featuredRef = useRef("");
  const roomsRef = useRef("");

  const addNewHotel = async (id) => {
    const hotelInput = {
      nameInput: nameRef.current.value,
      typeInput: typeRef.current.value,
      cityInput: cityRef.current.value,
      addressInput: addressRef.current.value,
      distanceInput: distanceRef.current.value,
      titleInput: titleRef.current.value,
      descInput: descRef.current.value,
      priceInput: priceRef.current.value,
      imagesInput: imagesRef.current.value,
      featuredInput: featuredRef.current.value,
      roomsInput: selectedRoomArr.map((room) => room._id),
    };

    console.log(hotelInput);
    // validate input blank
    for (let key in hotelInput) {
      if (!hotelInput[key]) {
        return alert("Please fill all the field");
      }
    }

    // validate Rooms selection
    if (selectedRoomArr.length === 0) {
      return alert("Please select at least one type of room");
    }

    // Send data to backend
    const res = await fetch("http://localhost:5000/admin/add-hotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotelInput),
    });

    if (res.ok) {
      alert("Add new hotel successfully");
    }
  };
  return (
    <div className={classes.layout}>
      <SideBar />
      <div className={classes.overall}>
        <h2>Add New Hotel</h2>
        <form className={classes["hotel-form"]}>
          <span>
            <label htmlFor="name">Name</label>
            <input type="text" ref={nameRef} placeholder="My Hotel" />
          </span>

          <span>
            <label htmlFor="type">Type</label>
            <input placeholder="hotel" type="text" ref={typeRef} />
          </span>
          <span>
            <label htmlFor="city">City</label>
            <input placeholder="New York" type="text" ref={cityRef} />
          </span>
          <span>
            <label htmlFor="address">Address</label>
            <input placeholder="216 Wall Street" type="text" ref={addressRef} />
          </span>
          <span>
            <label htmlFor="distance">Distance from City Center</label>
            <input placeholder="500" type="text" ref={distanceRef} />
          </span>
          <span>
            <label htmlFor="title">Title</label>
            <input placeholder="The best Hotel" type="text" ref={titleRef} />
          </span>
          <span>
            <label htmlFor="desc">Description</label>
            <input placeholder="desciption" type="text" ref={descRef} />
          </span>
          <span>
            <label htmlFor="price">Price</label>
            <input type="text" ref={priceRef} placeholder="100" />
          </span>
          <span className={classes.images}>
            <label htmlFor="images">Images</label>
            <textarea type="text" ref={imagesRef} />
          </span>
          <span>
            <label htmlFor="featured">Featured</label>
            <select type="text" ref={featuredRef}>
              <option>Yes</option>
              <option>No</option>
            </select>
          </span>
          <span className={classes.rooms}>
            <label htmlFor="rooms">Rooms</label>
            {/* <textarea type="text" ref={roomsRef} /> */}

            {roomArr.map((room) => (
              <div key={room._id}>
                <input
                  type="checkbox"
                  value={room._id}
                  // checked={selectedOptions[room.value] || false}
                  onChange={handleCheckboxChange}
                />
                <label>{room.title}</label>
              </div>
            ))}
          </span>
          <button type="button" onClick={addNewHotel}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminNewHotel;
