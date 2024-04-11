import { Fragment, useState, useEffect } from "react";
import classes from "./Admin.module.css";
import SideBar from "./SideBar";

const Admin = () => {
  const [txs, setTxs] = useState([]);
  useEffect(() => {
    const getTxs = async () => {
      const res = await fetch("http://localhost:5000/admin");
      const result = await res.json();
      console.log(result);
      setTxs(result);
    };
    getTxs();
  }, []);
  return (
    <div className={classes.layout}>
      <SideBar />
      <div className={classes.overall}>
        {/* Overall Metrics */}
        <div className={classes.infoboard}>
          <div className={classes["overall-card"]}>
            <span className={classes.tag}>USERS</span>
            <span className={classes.number}>100</span>
            <span className={`${classes.icon} ${classes["icon-red"]}`}>
              <i className="fa-solid fa-user"></i>
            </span>
          </div>
          <div className={classes["overall-card"]}>
            <span className={classes.tag}>ORDERS</span>
            <span className={classes.number}>100</span>
            <span className={`${classes.icon} ${classes["icon-yellow"]}`}>
              <i className="fa-solid fa-shopping-cart"></i>
            </span>
          </div>
          <div className={classes["overall-card"]}>
            <span className={classes.tag}>EARNINGS</span>
            <span className={classes.number}>100</span>
            <span className={`${classes.icon} ${classes["icon-blue"]}`}>
              <i className="fa-solid fa-dollar"></i>
            </span>
          </div>
          <div className={classes["overall-card"]}>
            <span className={classes.tag}>BALANCE</span>
            <span className={classes.number}>100</span>
            <span className={`${classes.icon} ${classes["icon-green"]}`}>
              <i className="fa-solid fa-money-bill"></i>
            </span>
          </div>
        </div>

        {/* Latest Txs */}
        <div className={classes.txs}>
          <h3>Latest Transactions</h3>
          <div className={classes["txs-table"]}>
            <table className={classes.table}>
              <thead className={classes.thead}>
                <tr>
                  <th style={{ width: "3%" }}>
                    <input type="checkbox" />
                  </th>
                  <th style={{ width: "18%" }}>ID</th>
                  <th style={{ width: "7%" }}>User</th>
                  <th style={{ width: "20%" }}>Hotel</th>
                  <th style={{ width: "10%" }}>Room</th>
                  <th style={{ width: "15%" }}>Date</th>
                  <th style={{ width: "7%" }}>Price</th>
                  <th style={{ width: "12%" }}>Payment Method</th>
                  <th style={{ width: "8%" }}>Status</th>
                </tr>
              </thead>
              <tbody id="tableBody">
                {txs.map((item, index) => {
                  const start = new Date(item.dateStart);
                  const end = new Date(item.dateEnd);
                  const date = `${start.getDate()}/${
                    start.getMonth() + 1
                  }/${start.getFullYear()} - ${end.getDate()}/${
                    end.getMonth() + 1
                  }/${end.getFullYear()}`;
                  return (
                    <tr key={index}>
                      <td style={{ width: "3%" }}>
                        <input type="checkbox" />
                      </td>
                      <td style={{ width: "18%" }}>{item._id}</td>
                      <td style={{ width: "7%" }}>{item.user.fullName}</td>
                      <td style={{ width: "20%" }}>{item.hotel.name}</td>
                      <td style={{ width: "10%" }}>{item.room.join(", ")}</td>
                      <td style={{ width: "15%" }}>{date}</td>
                      <td style={{ width: "7%" }}>${item.price}</td>
                      <td style={{ width: "12%" }}>{item.payment} </td>
                      {item.status === "Booked" && (
                        <td style={{ width: "8%", color: "green" }}>
                          {item.status}
                        </td>
                      )}
                      {item.status === "Checkin" && (
                        <td style={{ width: "8%", color: "yellow" }}>
                          {item.status}
                        </td>
                      )}
                      {item.status === "Checkout" && (
                        <td style={{ width: "8%", color: "red" }}>
                          {item.status}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={classes.pagination}>
            <i className="fa-solid fa-arrow-left"></i>
            <span>1 / 8</span>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
