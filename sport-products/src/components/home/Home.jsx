 import React from 'react'
 import Navbar from '../../parts/navbar/Nabbar'
//  import Offer from '../../parts/offer/Off`er'
 import  { useEffect, useState } from 'react';
 import { BsSearch } from '../../../node_modules/react-icons/bs';
import axios from 'axios';
import './home.css'
 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(' ');
  const [selectedOption, setSelectedOption] = useState('All products');

  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await axios.post(`http://localhost:5000/fetchproduct`,{
               value: selectedOption ,
               reqireiterm:  searchTerm
               // Add value as a query parameter
            });
            setProducts(result.data);
            
        } catch (err) {
            alert("Error fetching data");
        }
    };

    fetchData();
}, [selectedOption,searchTerm]);


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  
   return (
     <div> 
        <Navbar/>
        {/* <Offer/> */}

        <div className='main-product-container  '> 
      
         <div className='selection-category d-flex'>
            <label className=' ' htmlFor="selection">Select an option:</label>
            <select id="selection" value={selectedOption} onChange={handleOptionChange}>
              <option value="All products">All products</option>
              <option value="Cricket">Cricket</option>
              <option value="Running">Running</option>
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              </select>

              <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
            
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button><BsSearch /></button>
         </div>

        <ul className='product-container bg-light  d-flex w-100 ' style={{ textDecoration: 'none' }}>
            {products.map(product => (
              <li className='product-container-items  flex-sm-column pt-1 m-4  ' style={{ textDecoration: 'none' }} key={product.id}>
                <div className='product-detalist'>
                <img src={product.imagePath} alt={product.name} className='product-image' />
                <h1>{product.name}</h1>
                <div>{product.price}$</div>
                <div>{product.discription}</div>
                {/* <button className='btn btn-primary' onClick={() => storeToCheckout(product.img_path, product.name, product.prize, product.gender, product.itermscode, useremail)}>Add to checkout</button> */}
                <button className='btn btn-primary' >Add to checkout</button>
                </div>
              </li>
            ))}
          </ul>
      
        </div>
     </div>
   )
 }
 
 export default Home