 import React from 'react'
 import Navbar from '../../parts/navbar/Nabbar'
//  import Offer from '../../parts/offer/Off`er'
 import  { useEffect, useState } from 'react';
 import { BsSearch } from '../../../node_modules/react-icons/bs';
import axios  from 'axios';
import './home.css'
import { Link ,useLocation } from 'react-router-dom';
 

const Home = () => {
  const location = useLocation();
  const userEmail = new URLSearchParams(location.search).get('email');
  
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

  async function addtoCart(imagepath,name,code ,price){
        
         const result = await axios.post(`http://localhost:5000/addtocart`,{userEmail,imagepath,name,code,price});
          if(result.data =='Product already stored. Quantity updated.'){
            alert(result.data)
          }
  }

  
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
                <h2>{product.name}</h2>
                <div>{product.price}$</div>
                <div>{product.discription}</div>
                {/* <button className='btn btn-primary' onClick={() => storeToCheckout(product.img_path, product.name, product.prize, product.gender, product.itermscode, useremail)}>Add to checkout</button> */}
                <button className='btn btn-primary'  onClick={() =>addtoCart(product.imagePath,product.name,product.code,product.price)}>Add to checkout</button>
                </div>
              </li>
            ))}
          </ul>
      
        </div>
         <Link to={ `/cart?email=${userEmail}`}>
          <button className='addCart-btn btn btn-success '>Go To Cart</button>           
         </Link>
     </div>
   )
 }
 
 export default Home