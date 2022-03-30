import React from 'react';
import './homepage.css';
import background from "../../images/dentist.jpeg";

function HomePage() {
  return (
    <div className='hero-container'>
      <img src= {background} alt='' />
      <h1>Dentist Clinic</h1>
      <div className='hero-btns'>
      <a href="/CSI-2132/branches" className='btn' >Branches</a>
      </div>
    </div>

  );
}

export default HomePage;