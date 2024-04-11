import classes from "./BookingForm.module.css";
import { format, differenceInDays } from "date-fns";
import { Fragment, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const BookingForm = (props) => {
  const navigate = useNavigate();
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
    rooms,
  } = props.detail;

  // DATE
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection", // 'selection' is a required key for react-date-range
    },
  ]);

  // Tính số ngày book của khách
  const daysDifference =
    differenceInDays(dateRange[0].endDate, dateRange[0].startDate) || 1;
  console.log(`Number of days: ${daysDifference}`);
  // const [openDate, setOpenDate] = useState(false);

  // PERSONAL INFO
  // Ref reserve info
  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const idCardRef = useRef("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ROOM
  // Handler function to update selected rooms
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // If checkbox is checked, add the value to selected Rooms
      setSelectedRooms([...selectedRooms, JSON.parse(value)]);
    } else {
      // If checkbox is unchecked, remove the value from selected Rooms

      setSelectedRooms(
        selectedRooms.filter(
          (room) =>
            // room.id !== JSON.parse(value).id &&
            room.name !== JSON.parse(value).name ||
            (room.name === JSON.parse(value).name &&
              room.id !== JSON.parse(value).id)
        )
      );
    }
    console.log(selectedRooms);
  };

  // BILL
  // Sum up total bill
  const totalBill = selectedRooms.reduce((acc, cur) => {
    return acc + cur.price * daysDifference;
  }, 0);

  // ----------------
  // SUBMIT ALL INFORMATION
  // Get the hotel info

  // Get the date
  const date = {
    stateDate: format(dateRange[0].startDate, "MM/dd/yyyy"),
    endDate: format(dateRange[0].endDate, "MM/dd/yyyy"),
  };

  // Get the personal info
  // It is user._id

  // Get the room ordered
  // it is the selectedRooms Array
  const roomOrdered = selectedRooms.map((item) => item.name);
  const roomIdOrdered = selectedRooms.map((item) => item.id);

  // Get the total bill
  // It is the totalBill

  // Get the payment method
  const [payment, setPayment] = useState("Hello");
  const paymentHandler = (e) => {
    setPayment(e.target.value);
    console.log(payment);
  };

  // Now gather all the data into 1 object'
  const transactionInfo = {
    user: user._id,
    hotel: _id,
    room: roomOrdered,
    dateStart: date.stateDate,
    dateEnd: date.endDate,
    price: totalBill,
    payment: payment,
    status: "Booked",
  };

  // Validate and Submit form
  const reserveHandler = async () => {
    // validate Date
    if (transactionInfo.dateStart === transactionInfo.dateEnd) {
      return alert("Your booking period must be at least 1 day");
    }

    // validate personal info
    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !phoneRef.current.value ||
      !idCardRef.current.value
    ) {
      return alert("Your Reserve Info must be fully filled");
    }

    // validate room and price
    if (transactionInfo.room.length === 0) {
      return alert("Please select the rooms you want to book");
    }

    //validate payment method
    console.log(payment);
    const methods = ["Cash", "Credit Card"];
    const eligibleMethod = methods.find(
      (item) => item === transactionInfo.payment
    );
    if (!eligibleMethod) {
      return alert("Please choose your payment method");
    }
    console.log(transactionInfo);
    // Now send request to the backend
    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionInfo),
    });
    navigate("/transactions");
  };

  return (
    <div className={classes.booking}>
      <div className={classes["date-and-info"]}>
        <div className={classes.dates}>
          <span>{`${format(dateRange[0].startDate, "MM/dd/yyyy")} to ${format(
            dateRange[0].endDate,
            "MM/dd/yyyy"
          )}`}</span>
          <h2>Dates</h2>
          <DateRange
            onChange={(item) => setDateRange([item.selection])} //selection property store updated newly selected date range
            minDate={new Date()}
            ranges={dateRange}
          />
        </div>
        <div className={classes.info}>
          <h2>Reserve Info</h2>
          <form>
            <label htmlFor="fullname">Your Full Name</label>
            <input
              type="text"
              defaultValue={props.user.fullName}
              placeholder="Full Name"
              ref={nameRef}
              required
            />
            <label htmlFor="email">Your Email</label>
            <input
              type="text"
              defaultValue={props.user.email}
              placeholder="Email"
              ref={emailRef}
              required
            />
            <label htmlFor="phone-number">Your Phone Number</label>
            <input
              type="text"
              defaultValue={props.user.phone}
              placeholder="Phone Number"
              ref={phoneRef}
              required
            />
            <label htmlFor="id-card">Your Identity Card Number</label>
            <input
              type="text"
              placeholder="Card Number"
              ref={idCardRef}
              required
            />
          </form>
        </div>
      </div>

      {/* Room */}
      <div>
        <h2>Select Rooms</h2>
        <div className={classes["room-selections"]}>
          {rooms.map((room, index) => {
            return (
              <div key={index} className={classes.room}>
                <div>
                  <h3>{room.title}</h3>
                  <p>{room.desc}</p>
                  <span>
                    Max people: <strong>{room.maxPeople}</strong>
                  </span>
                  <p className={classes.price}>${room.price}</p>
                </div>
                <div>
                  {room.roomNumbers.map((item, index) => {
                    return (
                      <form key={index} className={classes["room-number"]}>
                        <input
                          type="checkbox"
                          value={JSON.stringify({
                            id: room._id,
                            price: room.price,
                            name: item,
                          })}
                          onChange={handleCheckboxChange}
                        />
                        {item}
                      </form>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total Bill */}
      <div className={classes["bill-and-order"]}>
        <div className={classes.bill}>
          <h2>Total Bill: ${totalBill}</h2>
          <form>
            <select
              id="payment"
              name="payment"
              value={payment}
              onChange={paymentHandler}
            >
              <option value="select">Select your payment method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </form>
        </div>

        <button onClick={reserveHandler} className={classes["reserve-button"]}>
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
