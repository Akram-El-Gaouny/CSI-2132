import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';



const Navbar = (props) => {

  return (
    
    <nav className= "sticky-top navbar navbar-expand-md navbar-dark my-navbar ">
     
      <div class="navbar-brand"> DCMS</div>
      
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div id="navbarMenu" className="navbar-collapse collapse   ">
        <ul className="navbar-nav ml-auto navlist">
          {props.List.map((item) => (
            <li className="nav-item mr-3 " key={item.display}>
              
              <Link to={item.path} className="nav-link nav-btn ">
                {item.display}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



      
      

