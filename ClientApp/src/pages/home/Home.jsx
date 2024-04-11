import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import { useState, useEffect } from "react";

import "./home.css";
import { useDispatch } from "react-redux";
import { hotelAction } from "../../util/store";

const Home = () => {
  const dispatch = useDispatch();
  const [hotelArr, setHotelArr] = useState([]);
  useEffect(() => {
    const getHotelList = async () => {
      const res = await fetch("http://localhost:5000/featured");
      const result = await res.json();
      console.log(result);

      dispatch(hotelAction.saveHotelList(result));
      setHotelArr(result);
    };
    getHotelList();
  }, []);
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured hotel={hotelArr} />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList hotel={hotelArr} />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties hotel={hotelArr} />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
