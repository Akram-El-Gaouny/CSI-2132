import React from 'react';
import './Footer.css';
import { Button } from './Button';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
      <p className='footer-subscription-heading'>
          Contact Us
        </p>
        <div className='input-areas'>
          <h5 style={{paddingTop:"20px"}}> Call us at (666)-200-4567</h5>
          <h5>or by email at DCMS.com</h5>
        </div>
      </section>
    </div>
  );
}

export default Footer;