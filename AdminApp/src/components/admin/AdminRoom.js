import { Fragment, useState, useEffect } from "react";
import classes from "./AdminList.module.css";
import { Link } from "react-router-dom";
const AdminRoom = (props) => {
  const [roomArr, setRoomArr] = useState([]);

  // Load rooms list
  useEffect(() => {
    const room = props.room;
    setRoomArr(room);
  }, [props.room]);

  console.log(roomArr);

  // Delete Action
  const deleteRoomHandler = async (id) => {
    const res = await fetch("http://localhost:5000/delete-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const result = await res.json();
    if (res.status === 200) {
      setRoomArr(result);
      alert("Room has been deleted");
    } else {
      alert(result);
    }
  };
  return (
    <div className={classes.txs}>
      <div className={classes.header}>
        <h3>Latest Transactions</h3>
        <Link to="/admin/add/room">
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
              <th style={{ width: "20%" }}>Title</th>
              <th style={{ width: "30%" }}>Description</th>
              <th style={{ width: "5%" }}>Price</th>
              <th style={{ width: "5%" }}>Max People</th>
              <th style={{ width: "5%" }}>Action</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {roomArr.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{ width: "3%" }}>
                    <input type="checkbox" />
                  </td>
                  <td style={{ width: "15%" }}>{item._id}</td>
                  <td style={{ width: "20%" }}>{item.title}</td>
                  <td style={{ width: "30%" }}>{item.desc}</td>
                  <td style={{ width: "5%" }}>${item.price}</td>
                  <td style={{ width: "5%" }}>{item.maxPeople}</td>
                  <td style={{ width: "5%" }}>
                    <button
                      onClick={() => deleteRoomHandler(item._id)}
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

export default AdminRoom;
