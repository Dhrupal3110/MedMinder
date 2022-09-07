import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>

<footer className="Footer" >

  <div className='box-container'>© 2022 Copyright:
    <Link to="/home"> MedMinder.com </Link>
  </div>

</footer>

    </>
  )
}

export default Footer
