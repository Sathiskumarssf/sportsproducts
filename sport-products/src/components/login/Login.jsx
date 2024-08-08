import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
 
import Navbar from '../../parts/navbar/Nabbar'


import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { useremail, password });
      const { message, token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('jwtToken', token);

      // Navigate based on the user role
      if (message === 'admin Login successful') {
        navigate(`/admin?email=${useremail}`);
      } else if (message === 'user Login successful') {
        navigate(`/home?email=${useremail}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Email or password incorrect');
    }
  };

  return ( 
    <div>
      <Navbar />
      
    <div className='login-constainer bg-light'>
        <div className='main-container d-flex '>
          
             <div className='heading-containr'>
             <h1 className='login-heading-text text-light   '  >Gear Up for Adventure: Your Premier Destination for Sports Equipment and Accessories!</h1>
             </div>
         <div className='login-container-component   p-5 m-5'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='d-flex'>
              <label className='input-label'>UserEamil:</label>
              <input className="form-control" type="text" value={useremail} placeholder='Enter your Email' onChange={(e) => setUseremail(e.target.value)} />
            </div>
            <div className='d-flex mt-2'>
              <label className='input-label'>Password:</label>
              <input className="form-control" type="password" value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='d-flex'>
            <button type="submit" className='btn-primary btn '>Login</button>
            <Link to='/'>
              <button className='register-btn btn-primary btn mt-2'>Register</button>
            </Link>
            </div>
          </form>
        
        
          
       
         </div>
        </div>
    </div>

    
    </div>
  );
};

export default Login;
