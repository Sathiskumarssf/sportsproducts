import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './register.css'

import Navbar from '../../parts/navbar/Nabbar'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [useremail, setuseremail] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();

  
     await axios.post('http://localhost:5000/register', { username, useremail,password })
     .then(result => console.log(result))
     .catch(err=>console.log(err))
         
     
  }

  return (
      <div>
        <Navbar/>
        <div className='register-container d-flex'>
          <div className='main-container1 d-flex '>

          <div className='box'>
           <div className='heading-containr1  '>
               <h1 className='register-heading-text text-light '  >Gear Up for Adventure: Your Premier Destination for Sports Equipment and Accessories!</h1>
           </div>
            </div>

              <div className='box'>
                    
                    <div className='register-container-component   p-5 m-5'>
                    <h2>Rgister</h2>
                    <form onSubmit={handleSubmit}>
                      <div className='d-flex'>
                        <label className='label-input'>Username:</label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      <div className='d-flex mt-1'>
                        <label className='label-input'>UserEmial:</label>
                        <input type="text" className="form-control" value={useremail} onChange={(e) => setuseremail(e.target.value)} />
                      </div>
                      <div className='d-flex mt-2'>
                        <label className='label-input ml-2'>Password:</label>
                        <input type="password" className="form-control  " value={password} onChange={(e) => setPassword(e.target.value)} />
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
      </div>
  );
};

export default Register;
