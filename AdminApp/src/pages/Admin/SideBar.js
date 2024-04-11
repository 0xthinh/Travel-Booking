import { Fragment } from "react";
import classes from "./SideBar.module.css";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className={classes.sidebar}>
      <h2>Admin Page</h2>
      <div className={classes.menu}>
        {/* MAIN */}
        <div className={classes["menu-main"]}>
          <h3>MAIN</h3>
          <Link to="/admin">
            <span className={classes["menu-item"]}>
              <i className="fa-solid fa-table"></i>
              <span className={classes["menu-name"]}>Dashboard</span>
            </span>
          </Link>
        </div>

        {/* LISTS */}
        <div className={classes["menu-main"]}>
          <h3>LISTS</h3>
          <div className={classes.items}>
            <span className={classes["menu-item"]}>
              <i className="fa-solid fa-user"></i>
              <span className={classes["menu-name"]}>Users</span>
            </span>
            <Link to="/admin/hotel">
              <span className={classes["menu-item"]}>
                <i className="fa-solid fa-hotel"></i>
                <span className={classes["menu-name"]}>Hotels</span>
              </span>
            </Link>
            <Link to="/admin/room">
              <span className={classes["menu-item"]}>
                <i className="fa-solid fa-bed"></i>
                <span className={classes["menu-name"]}>Rooms</span>
              </span>
            </Link>
            <Link to="/admin/transaction">
              <span className={classes["menu-item"]}>
                <i className="fa-solid fa-money-bills"></i>
                <span className={classes["menu-name"]}>Transactions</span>
              </span>
            </Link>
          </div>
        </div>

        {/* NEW */}
        <div className={classes["menu-main"]}>
          <h3>NEW</h3>
          <div className={classes.items}>
            <Link to="/admin/add/hotel">
              <span className={classes["menu-item"]}>
                <i className="fa-solid fa-hotel"></i>
                <span className={classes["menu-name"]}>New Hotels</span>
              </span>
            </Link>
            <Link to="/admin/add/room">
              <span className={classes["menu-item"]}>
                <i className="fa-solid fa-bed"></i>
                <span className={classes["menu-name"]}>New Rooms</span>
              </span>
            </Link>
          </div>
        </div>

        {/* USER */}
        <div className={classes["menu-main"]}>
          <h3>ACTION</h3>

          <span className={classes["menu-item"]}>
            <i className="fa-solid fa-right-from-bracket"></i>{" "}
            <span className={classes["menu-name"]}>Logout</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
