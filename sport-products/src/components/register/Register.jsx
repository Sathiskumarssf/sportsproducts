import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './register.css'
import coverimage from '../../assets/sports-tools_53876-138077.avif'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();

  
     await axios.post('http://localhost:5000/register', { username, password })
     .then(result => console.log(result))
     .catch(err=>console.log(err))
         
     
  }

  return (
     <div className='register-container d-flex'>
       <div className='main-container d-flex '>

       <div className='box'>
        <img src= {coverimage} className='coverimage' alt="" srcset="" />
      </div>

      <div className='box'>
             
            <div className='register-container-component bg-info p-5 m-5'>
            <h2>Rgister</h2>
            <form onSubmit={handleSubmit}>
              <div className='d-flex'>
                <label className='label-input'>Username:</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className='d-flex mt-2'>
                <label className='label-input'>Password:</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className='btn-primary btn'>Register</button>
            </form>
          
          
            <Link to='/login'>
                <button className='btn-primary btn mt-2'>Login</button>
            </Link>
            </div>
           
      </div>
       </div>
     </div>
  );
};

export default Register;
