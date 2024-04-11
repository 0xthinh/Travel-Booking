import classes from "./Login.module.css";
import { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [response, setResponse] = useState({});
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const passwordRef = useRef("");

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
    e.preventDefault();

    const userLogin = { username: usernameInput, password: passwordInput };

    try {
      // Gửi post req đến backend
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });
      const result = await res.json();

      setResponse(result);
      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.userLoggedIn));
        if (result.userLoggedIn.username === "admin") {
          return (window.location.href = "http://localhost:3001/admin");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className={classes.login}>
        <h2>Login</h2>
        <form>
          <input placeholder="Username" ref={usernameRef} required />
          <input placeholder="Password" ref={passwordRef} required />
          {response.success ? (
            navigate("/")
          ) : (
            <p style={{ color: "red" }}>{response.message}</p>
          )}
          <button type="submit" onClick={submitHandler}>
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
