/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Blogs = () => {
  return (
    <div className='paddingTop'>
      <section className="blogs" id="blogs">

<h1 className="heading"> our <span>blogs</span> </h1>

<div className="box-container">

    <div className="box">
        <div className="image">
            <img src="image/blog-1.jpg" alt=""/>
        </div>
        <div className="content">
            <div className="icon">
                <a href="#"> <i className="fas fa-calendar"></i> 1st may, 2021 </a>
                <a href="#"> <i className="fas fa-user"></i> by admin </a>
            </div>
            <h3>8 Effective Medication Reminder Strategies </h3>
            <a href=" https://www.caringseniorservice.com/blog/medication-reminder-strategies" className="btn"> learn more <span className="fas fa-chevron-right"></span> </a>
        </div>
    </div>

    <div className="box">
        <div className="image">
            <img src="image/blog-2.jpg" alt=""/>
        </div>
        <div className="content">
            <div className="icon">
                <a href="#"> <i className="fas fa-calendar"></i> 1st may, 2021 </a>
                <a href="#"> <i className="fas fa-user"></i> by admin </a>
            </div>
            <h3>The Importance of Medication Reminders</h3>
<a href="https://www.homewatchcaregivers.com/blog/caregivers/the-importance-of-medication-reminders/" className="btn"> learn more <span className="fas fa-chevron-right"></span> </a>
        </div>
    </div>

    <div className="box">
        <div className="image">
            <img src="image/blog-3.jpg" alt=""/>
        </div>
        <div className="content">
            <div className="icon">
                <a href="#"> <i className="fas fa-calendar"></i> 1st may, 2021 </a>
                <a href="#"> <i className="fas fa-user"></i> by admin </a>
            </div>
            <h3>Getting started with MedMinder</h3>
            <a href="https://www.medminder.pharmacy/faq/
            " className="btn"> learn more <span className="fas fa-chevron-right"></span> </a>
        </div>
    </div>

</div>

</section>
    </div>
  )
}

export default Blogs
