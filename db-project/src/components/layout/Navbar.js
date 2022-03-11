import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>DCMS</Link>
             
            <li className='nav-links'>
              <Link to='/' className='nav-links' ></Link>
            </li>
           
            <li className='nav-links'>
              <Link to='/button1' className='nav-links'> Button1</Link>
            </li>
            <li className='nav-links'>
              <Link to='/button2' className='nav-links'> Button2 </Link>
            </li>

            <li className='nav-links'>
              <Link to='/button3' className='nav-links'> Button3</Link>
            </li>

            <li className='nav-links'>
              <Link to='/button4' className='nav-links'> Button4 </Link>
            </li>

            <li className='nav-links'>
              <Link to='/button5' className='nav-links'> Button5 </Link>
            </li>
        </div>
      </nav>
    </>
  );
}

export default Navbar;