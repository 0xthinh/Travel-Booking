import { Fragment, useState, useEffect } from "react";
import classes from "./AdminList.module.css";
import { Link } from "react-router-dom";
const AdminHotel = (props) => {
  const [hotelArr, setHotelArr] = useState([]);

  // hotel được get từ API call nên cần cho vào useEffect thì mới dùng với useState được
  useEffect(() => {
    const hotel = props.hotel;
    setHotelArr(hotel);
  }, [props.hotel]);

  // console.log(hotelArr);
  // Delete Action
  const deleteHotelHandler = async (id) => {
    console.log(id);
    const res = await fetch("http://localhost:5000/delete-hotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const result = await res.json();
    if (res.status === 200) {
      setHotelArr(result);
      alert("Hotel has been deleted");
    } else {
      alert(result);
    }
  };
  return (
    <div className={classes.txs}>
      <div className={classes.header}>
        <h3>Latest Transactions</h3>
        <Link to="/admin/add/hotel">
          <button className={classes["add-new"]}>Add new</button>
        </Link>
      </div>
      <div className={classes["txs-table"]}>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr>
              <th style={{ width: "3%" }}>
                <input type="checkbox" />
              </th>
              <th style={{ width: "15%" }}>ID</th>
              <th style={{ width: "20%" }}>Name</th>
              <th style={{ width: "10%" }}>Type</th>
              <th style={{ width: "20%" }}>Title</th>
              <th style={{ width: "10%" }}>City</th>
              <th style={{ width: "5%" }}>Action</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {hotelArr.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{ width: "3%" }}>
                    <input type="checkbox" />
                  </td>
                  <td style={{ width: "15%" }}>{item._id}</td>
                  <td style={{ width: "20%" }}>{item.name}</td>
                  <td style={{ width: "10%" }}>{item.type}</td>
                  <td style={{ width: "20%" }}>{item.title}</td>
                  <td style={{ width: "10%" }}>{item.city}</td>
                  <td style={{ width: "5%" }}>
                    <button
                      onClick={() => deleteHotelHandler(item._id)}
                      className={classes.delete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHotel;
