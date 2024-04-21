import React, { useState, useEffect } from 'react';
import './cart.css';
import axios from 'axios';
import Navbar from '../../parts/navbar/Nabbar';
import { useLocation } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const userEmail = new URLSearchParams(location.search).get('email');

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(`http://localhost:5000/orderedproduct`, {
          userEmail
        });
        setProducts(result.data.map(product => ({
          ...product,
          quantity: 1 // Default quantity set to 1
        })));
      } catch (err) {
        alert("Error fetching data");
      }
    };

    fetchData();
  }, [userEmail]);

  const removeProduct = async (code) => {
    try {
      const result = await axios.post('http://localhost:5000/removeorderedproduct', {
        code,
        userEmail
      });
      console.log(result.data);
      setProducts(products.filter(product => product.code !== code));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const increaseQuantity = (code) => {
    setProducts(products.map(product => {
      if (product.code === code) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    }));
  };

  const decreaseQuantity = (code) => {
    setProducts(products.map(product => {
      if (product.code === code && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    }));
  };

  // Calculate total amount for payment
  const totalAmount = products.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    <div className="cart-main">
      <Navbar />
      <h2 className='heading-cart text-primary'>Shopping Cart</h2>
      <table className="cart-items bg-light table align-middle">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="cart-item">
              <td><img src={product.imagepath} style={{ height: "100px", width: "100px" }} alt={product.name} /></td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button className='btn btn-success' onClick={() => increaseQuantity(product.code)}>+</button>
                {product.quantity}
                <button className='btn btn-success' onClick={() => decreaseQuantity(product.code)}>-</button>
              </td>
              <td><button className='btn btn-danger' onClick={() => removeProduct(product.code)}>Remove</button></td>
              <td>${product.price * product.quantity}</td> {/* Calculate total price */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">
        <h3>Total Amount: ${totalAmount}</h3>
        <button className='btn btn-warning'>Check Out</button>
      </div>
    </div>
  );
};

export default Cart;
