import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import coverimage from '../../assets/sports-tools_53876-138077.avif';
import Navbar from '../../parts/navbar/Nabbar'


import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

  
     await axios.post('http://localhost:5000/login', { username, password })
     .then((result => {
        if(result.data ==="User already exists"){
            navigate(`/home`);
        }
     }))
     .catch(err=>console.log(err))
         
     
  }

  return ( 
    <div>
      <Navbar />
      
    <div className='login-constainer bg-light'>
        <div className='main-container d-flex '>
         <div className='box'>
          <img src= {coverimage} alt="" srcset="" className='coverimage'/>
         </div>
          
         <div className='box'>

         <div className='login-container-component bg-info p-5 m-5'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='d-flex'>
              <label className='input-label'>Username:</label>
              <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='d-flex mt-2'>
              <label className='input-label'>Password:</label>
              <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className='btn-primary btn '>Login</button>
          </form>
        
        
          <Link to='/'>
              <button className='btn-primary btn mt-2'>Register</button>
          </Link>
       </div>
         </div>
        </div>
    </div>
    </div>
  );
};

export default Login;
