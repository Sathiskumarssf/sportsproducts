import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

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
    <div>
      <h2>Rgister</h2>
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
     
     
       <Link to='/login'>
           <button>Login</button>
      </Link>
    </div>
  );
};

export default Register;
