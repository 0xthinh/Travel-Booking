import { Fragment, useEffect, useState } from "react";
import classes from "./Table.module.css";

const Table = (props) => {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    const getTxs = async () => {
      const res = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: props.userId }),
      });
      const result = await res.json();
      console.log(result);
      if (res.status == 404) {
        return setTxs([]);
      }
      setTxs(result);
    };
    getTxs();
  }, []);
  return (
    <table className={classes.stripedTable}>
      <thead className={classes.thead}>
        <tr>
          <th style={{ width: "5%" }}>#</th>
          <th style={{ width: "30%" }}>Hotel</th>
          <th style={{ width: "10%" }}>Room</th>
          <th style={{ width: "25%" }}>Date</th>
          <th style={{ width: "10%" }}>Price</th>
          <th style={{ width: "10%" }}>Payment Method</th>
          <th style={{ width: "10%" }}>Status</th>
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
              <td style={{ width: "5%" }}>{index + 1}</td>
              <td style={{ width: "30%" }}>{item.hotel.name}</td>
              <td style={{ width: "10%" }}>{item.room.join(",")}</td>
              <td style={{ width: "15%" }}>{date}</td>
              <td style={{ width: "10%" }}>{item.price}</td>
              <td style={{ width: "10%" }}>{item.payment} </td>
              <td style={{ width: "10%" }}>{item.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
