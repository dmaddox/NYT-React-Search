import React from "react";
import "./Nav.css";

const Nav = () =>
  
  <div className="container-fluid">
  
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="col-lg-10">
      <a className="nav-item" href="/">New York Times Search</a>
    </div>
    <div className="col-lg-2">

          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">Search</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Saved">Saved</a>
              </li>
            </ul>
          </div>
        
    </div>
    </nav>
  </div>;

export default Nav;
