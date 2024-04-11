import { Fragment, useState, useEffect, useRef } from "react";
import classes from "./AdminNewRoom.module.css";
import { Link } from "react-router-dom";
import SideBar from "../../pages/Admin/SideBar";
const AdminNewRoom = () => {
  const [hotelArr, setHotelArr] = useState([]);
  const [roomArr, setRoomArr] = useState([]);
  const [hotelIdInput, setHotelIdInput] = useState();

  // Handle hotel selection
  const hotelSelectHandler = (e) => {
    console.log(e.target.value);
    setHotelIdInput(e.target.value);
  };

  useEffect(() => {
    const getHotels = async () => {
      const res = await fetch("http://localhost:5000/get-hotel");
      const result = await res.json();
      console.log(result);
      setHotelArr(result);
    };
    getHotels();
  }, []);

  // useRef để get value của input khác

  const titleRef = useRef("");
  const descRef = useRef("");
  const priceRef = useRef("");
  const maxPeopleRef = useRef("");
  const hotelRef = useRef("");
  const roomsRef = useRef("");

  // Handle submit button
  const addNewRoom = async (id) => {
    const roomInput = {
      titleInput: titleRef.current.value,
      descInput: descRef.current.value,
      priceInput: priceRef.current.value,
      maxPeopleInput: maxPeopleRef.current.value,
      roomNumbersInput: roomsRef.current.value,
      hotelInput: hotelIdInput,
    };

    console.log(roomInput);
    // validate input blank
    for (let key in roomInput) {
      if (!roomInput[key]) {
        return alert("Please fill all the field");
      }
    }

    // Send data to backend
    const res = await fetch("http://localhost:5000/admin/add-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomInput),
    });

    if (res.ok) {
      alert("Add new room successfully");
    }
  };
  return (
    <div className={classes.layout}>
      <SideBar />
      <div className={classes.overall}>
        <h2>Add New Room</h2>
        <form className={classes["hotel-form"]}>
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
          <span>
            <label htmlFor="maxPeople">Max People</label>
            <input placeholder="4" type="text" ref={maxPeopleRef} />
          </span>

          <span className={classes.rooms}>
            <label htmlFor="rooms">Room Numbers</label>
            <input
              placeholder="Give comma between room number. (Ex: 102,103,104)"
              type="text"
              ref={roomsRef}
            />
          </span>
          <span>
            <label htmlFor="hotel">Choose a hotel</label>
            <select onChange={hotelSelectHandler} type="text" ref={hotelRef}>
              <option disabled selected>
                ---Choose Hotel---
              </option>
              {hotelArr.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </span>
          <button type="button" onClick={addNewRoom}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminNewRoom;
