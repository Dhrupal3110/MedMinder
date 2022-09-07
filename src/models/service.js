import React from 'react'
import { Link} from "react-router-dom";
const Service = () => {
  return (
  <div className='paddingTop'>
  <section className="services" id="services">

<h1 className="heading"> our <span>services</span> </h1>

<div className="box-container">

  
    <div className="box">
        <i className="fas fa-ambulance"></i>
        <h3>TO DO List</h3>
        <p></p>
        <Link to="todo" className="btn">Explore More <span className="fas fa-chevron-right"></span></Link>

        {/* <a href="../javascript-timer/index.html" className="btn"> Explore More <span className="fas fa-chevron-right"></span> </a> */}
    </div>

    <div className="box">
        <i className="fas fa-user-md"></i>
        <h3>Pill NOtification & Alarm</h3>
        <p></p>
        <Link to="pillAlarm" className="btn">Explore More <span className="fas fa-chevron-right"></span></Link>
        {/* <a href="./javascript-timer/index.html" className="btn"> Explore More <span className="fas fa-chevron-right"></span> </a> */}
    </div>

    <div className="box">
        <i className="fas fa-heartbeat"></i>
        <h3>total care</h3>
        <p></p>
        <Link to="totalCare" className="btn">learn more <span className="fas fa-chevron-right"></span></Link>
        {/* <a href="./Total Care/index.html" className="btn"> learn more <span className="fas fa-chevron-right"></span> </a> */}
    </div>

</div>

</section>
  </div>
    )
}

export default Service
