import React, { useState } from 'react';
import './checkout.css'; // Import CSS file for additional styling
import Navbar from '../../parts/navbar/Nabbar'
import { useLocation } from 'react-router-dom';

function Checkout() {
    const location = useLocation();
    const tetelPrize = new URLSearchParams(location.search).get('totalAmount');
    const useremail = new URLSearchParams(location.search).get('useremail');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(useremail);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement your logic to handle the payment submission
    console.log('Payment submitted:', {
      cardNumber,
      expiryDate,
      cvv,
      name,
      email
    });
    // Reset the form fields after submission
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setName('');
    setEmail('');
  };

  return (
    <div className="checkout-main ">
        <Navbar/>
       

       <div className='checkout-main-container bg-light text-center'>
            <h2 className='mt-5'>Full amount : {tetelPrize}</h2>
            <form onSubmit={handleSubmit}>

            <div className="form-group-checkout">
                    <label>Card Type:</label>
                    <select 
                        className="form-control-checkout" 
                        
                    >
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="American Express">American Express</option>
                        {/* Add more options as needed */}
                    </select>
            </div>
            <div className="form-group-checkout">
                <label>Card Number:</label>
                <input type="text" className="form-control-checkout" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            </div>
            <div className="form-group-checkout">
                <label>Expiry Date:</label>
                <input type="text" className="form-control-checkout" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>
            <div className="form-group-checkout">
                <label>CVV:</label>
                <input type="text" className="form-control-checkout" value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </div>
            
            <div className="form-group-checkout">
                <label>Email: </label>
                <input type="text" className="form-control-checkout" value={email}  onChange={(e) => setEmail(e.target.value)}  />
            </div>
            <button type="submit" className="btn btn-primary">Submit Payment</button>
            </form>

       </div>
    </div>
  );
}

export default Checkout;
