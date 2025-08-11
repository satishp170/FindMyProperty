import React from 'react';
import './about.css';

const About = () => {
  return (
    <div id='about' className="about-section-glass">
      <div className="about-glass-card">
        <div className="about-glass-content">
          <h2>We Don't Just Sell Homes.<br /><span>We Create Dreams.</span></h2>
          <p>
            At <strong>Find My Property</strong>, we redefine real estate with trust,
            technology, and a touch of heart. Our mission is to make home buying
            joyful, transparent, and empowering.
          </p>
          <p>
            From luxury penthouses to serene plots, our listings are hand-picked to
            match your aspirations. With 24/7 assistance, verified properties, and
            personalized service — your journey home starts here.
          </p>
          <button className="glass-button">Discover More</button>
        </div>
        <div className="about-glass-image">
          <img
            src="https://images.unsplash.com/photo-1678762200388-51e11225d4de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlJTIwaW50ZXJpb3IlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Find My Property"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
