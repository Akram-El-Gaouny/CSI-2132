import React from 'react';
import './homepage.css';

function HomePage() {
  return (
    <div className='hero-container'>
      <img src='images/dentist.jpeg' />
      <h1>Dentist Clinic</h1>
      <div className='hero-btns'>
      <button className='btn' >Branches</button>
      </div>
    </div>

  );
}

export default HomePage;