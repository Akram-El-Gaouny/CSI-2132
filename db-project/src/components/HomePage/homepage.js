import React from 'react';
import './homepage.css';

function HomePage() {
  return (
    <div className='hero-container'>
      <img src='images/dentist.jpeg' alt='' />
      <h1>Dentist Clinic</h1>
      <div className='hero-btns'>
      <a href="/CSI-2132/branches" className='btn' >Branches</a>
      </div>
    </div>

  );
}

export default HomePage;