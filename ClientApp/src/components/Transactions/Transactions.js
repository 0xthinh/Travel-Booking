import { Fragment, useEffect } from "react";
import Navbar from "../navbar/Navbar";

import Footer from "../footer/Footer";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user")) || "";
  console.log(currentUser._id);

  console.log(currentUser);
  useEffect(() => {
    if (!currentUser) {
      return navigate("/login");
    }
  }, []);
  return (
    <Fragment>
      <Navbar />
      <Table userId={currentUser._id} />
      <Footer />
    </Fragment>
  );
};

export default Transactions;
