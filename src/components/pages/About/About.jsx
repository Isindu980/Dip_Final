import React from 'react';
import './About.css';



function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-image" >
          <img src="about.jpg" alt="volunteer" />
        </div>
        
        
        <div className="about-details">
          <h1 className="about-title">What Is volunT</h1>
          <p className="about-description">
          Welcome to volunT, your go-to platform for connecting passionate volunteers with meaningful opportunities. We are a community-driven organization committed to making a positive impact in the world by uniting those who want to give back with the organizations and causes that need their help.We provide a central hub for volunteers and organizations to find each other. Whether you're a dedicated volunteer looking for your next project or a non-profit seeking help, we offer a user-friendly platform to facilitate these connections.


            <br />
            <br/>

                     </p>
                     <h2 className="about-title">Join With Us</h2>
                     <p className="about-description">
                     Whether you're a seasoned volunteer or just starting your journey, volunT is your partner in making a difference. Join our growing community, explore the vast array of volunteer opportunities, and be a part of something bigger than yourself.

Thank you for choosing volunT as your platform for positive change. Together, we can create a world where compassion and action go hand in hand.
                     </p>
        </div>
      </div>
    </div>
  );
}

export default About;