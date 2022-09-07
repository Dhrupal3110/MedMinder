import React from 'react'

const About = () => {
  return (
    <>
    <div className='paddingTop'>
    <section className="about" id="about">

<h1 className="heading"> <span>about</span> us </h1>

<div className="row">

    <div className="image">
        <img src="image/about-img.svg" alt=""/>
    </div>

    <div className="content">
        <h3>we take care of your healthy life</h3>
        <p>Health care is a team effort, and you're the most important member of the team! Your team also includes doctors, nurses, pharmacists, and insurance providers. </p>
        <p></p>
    </div>

</div>

</section>
<section className="review paddingBottom" id="review">
    
    <h1 className="heading"> client's <span>review</span> </h1>

    <div className="box-container">

        <div className="box">
            <img src="image/pic-1.png" alt=""/>
            <h3>Akshay Satasiya</h3>
            <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
            </div>
            <p className="text">5.0 out of 5 stars Medminder has been an amazing help! I've been using MedMinder for my father-in-law for about a year and I cannot stop raving about it to everyone I meet that could really benefit from having/using MedMinder. </p>
        </div>

        <div className="box">
            <img src="image/pic-2.png" alt=""/>
            <h3>Rinkal Patel</h3>
            <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
            </div>
            <p className="text">"The uniqueness of this unit is that it is easy to use</p>
        </div>

        <div className="box">
            <img src="image/pic-3.png" alt=""/>
            <h3>Ronak Svaliya</h3>
            <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
            </div>
            <p className="text">"I love this. I was always worried about my Mom taking medications."</p>
        </div>

    </div>

</section>
    </div>
    </>
  )
}

export default About
