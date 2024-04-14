import React, { useState } from 'react';
import axios from 'axios';

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
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
     
     
       <Link to='/'>
           <button>Login</button>
      </Link>
    </div>
  );
};

export default Login;
