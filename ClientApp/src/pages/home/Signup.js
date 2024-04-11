import classes from "./Signup.module.css";
import { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [response, setResponse] = useState({});
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const emailRef = useRef("");
  const fullnameRef = useRef("");
  const phoneRef = useRef("");

  // Nếu user đã login thì chuyển hướng đến home page
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(currentUser);
    if (currentUser) {
      return navigate("/");
    }
  });

  // Handle the sign up action
  const submitHandler = async (e) => {
    const usernameInput = usernameRef.current.value;
    const passwordInput = passwordRef.current.value;
    const fullnameInput = fullnameRef.current.value;
    const emailInput = emailRef.current.value;
    const phoneInput = phoneRef.current.value;
    e.preventDefault();
    console.log(usernameInput, passwordInput);
    const userSignUp = {
      username: usernameInput,
      password: passwordInput,
      fullName: fullnameInput,
      email: emailInput,
      phone: phoneInput,
    };
    console.log(userSignUp);

    try {
      // Gửi post req đến backend
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSignUp),
      });
      const result = await res.json();
      // console.log(result);
      setResponse(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className={classes.signup}>
        <h2>Signup</h2>
        <form onSubmit={submitHandler}>
          <input placeholder="Username" ref={usernameRef} required />
          <input placeholder="Password" ref={passwordRef} required />
          <input placeholder="Full Name" ref={fullnameRef} required />
          <input placeholder="Email" ref={emailRef} required />
          <input placeholder="Phone Number" ref={phoneRef} required />

          {response.success ? (
            navigate("/login")
          ) : (
            <p style={{ color: "red" }}>{response.message}</p>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;
