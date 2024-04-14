import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { MdLocationOn } from '../../../node_modules/react-icons/md';
import { MdContacts  } from '../../../node_modules/react-icons/md';


const Nabbar = () => {
  return (
    <div  >
      <nav class="navbar  navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Menu </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link">
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  <MdContacts/> Contact
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://maps.app.goo.gl/zNLrjTiBgqK61b399"><MdLocationOn/>Location</a>
              </li>
            </ul>
            
          </div>
        </div>
     </nav>
    </div>
  )
}

export default Nabbar