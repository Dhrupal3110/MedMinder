import React from "react";
import "../App.css";
import {Link} from "react-router-dom";
import Doctor from "./doctor";
import Navigate from "./navigate";
const Home = () => {

  const Doctors = async () => {
    const response = await fetch(`http://127.0.0.1:5000/api/doctor/Do.Data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
    // const myJSON = JSON.stringify(json);
    // let Doctorss = [];
    // Doctorss.map((index, myJSON) => {
    //   return (<Doctor key={index._id} mydata={index} />);
    // });
  };
  return (
    <><Navigate />
    <div className="paddingTop">
      <section className="home" id="home">
        <div className="image">
          <img src="image/home-img.svg" alt="" />
        </div>

        <div className="content">
          <h3>stay safe, stay healthy</h3>
          <p>A good health is the best wealth.</p>
        </div>
      </section>
      <section className="icons-container">
        <Link to="/Doctors">
          <div className="icons">
            <i className="fas fa-user-md"></i>
            <h3>140+</h3>
            <p>doctors at work</p>
          </div>

        </Link>
        <a href="./patient/patient.html" className="icons">
          <i className="fas fa-users"></i>
          <h3>1040+</h3>
          <p>satisfied patients</p>
        </a>

        <a href="./hospital/hospital.html" className="icons">
          <i className="fas fa-hospital"></i>
          <h3>80+</h3>
          <p>available hospitals</p>
        </a>
      </section>
    </div></>
  );
};
export default Home;
// export {Doctor} ;
