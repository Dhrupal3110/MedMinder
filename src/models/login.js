/* eslint-disable jsx-a11y/img-redundant-alt */
import "../App.css";
import "./Login.css"
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  let history = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged in sucess", "success");
      history("/home");
    } else {
      props.showAlert("invelid credential", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="paddingTop">
        <section className="book" id="book" >
        <h1 className="heading">
          <span>Medical </span> World
        </h1>
        <div className="row">
          <div className="image-1">
            <img src="../image/book-img.svg" alt="Displey image" />
          </div>

          <form action="/" method="post" className="book row form">
            <h3>Login Your Self</h3>

            <input
              className="box"
              type="email"
              name="email"
              placeholder="your email"
              onChange={onChange}
              value={credentials.email}
            />
            <input
              className="box"
              type="text"
              name="password"
              placeholder="your password"
              onChange={onChange}
              value={credentials.password}
            />

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        </section>
      </div>
    </>
  );
};

export default Login;
