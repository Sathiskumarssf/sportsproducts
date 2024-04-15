import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post("http://localhost:5000/fetchdata");
        setData(result.data);
      } catch (err) {
        alert ("error")
      } finally {
    
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
       
        <ul className='product-container w-100' style={{ textDecoration: 'none' }}>
          {data.map(user => (
            <li className='product-container-items flex-sm-column pt-1 m-4' key={user._id}>
              <h1>{user.username}</h1>
              <div>{user.email}</div>
              <div>{user.password}</div>
            </li>
          ))}
        </ul>
      
    </div>
  );
};

export default Home;
