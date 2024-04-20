import React, { useState ,useEffect} from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';
import Navbar from '../../parts/navbar/Nabbar'

const Admin = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);

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
}, [selectedOption,searchTerm,removeproducts]);


  async function removeproducts(code){
    
     const removepro = await axios.post('http://localhost:5000/removeproducts',{code})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the product data to the backend
    try {
      await axios.post('http://localhost:5000/addproducts', { name,code,price,description,image,category})
     .then(result => console.log(result))
     .catch(err=>console.log(err))

      // console.log(response.data); // Log the response from the server
      // You can add further handling, such as displaying a success message to the user
    } catch (error) {
      console.error('Error adding product:', error);
      // You can handle errors, such as displaying an error message to the user
    }
  };

  function changedispaly() {
    // Toggle the showProductForm state
    setShowProductForm(prevState => !prevState);
  }
  
  

  return (
    <div className='admin-main bg-light vh-100'>
     <div>
     <Navbar/>
      <h1 className='wawe-text bg-light'>Dear Admin your are wormly Welcome</h1>
      <div className='form-container' style={{ display: showProductForm ? 'block' : 'none' }} id='product-div'>
          <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label>Code:</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
              </div>
              <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div>
                <label>Image URL:</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
              </div>
              <div className='selected-admin-iterm'>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="All products">All products</option>
                <option value="Cricket">Cricket</option>
                <option value="Running">Running</option>
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                    
                </select>
              </div>
              <button type="submit">Add Product</button>
            </form>
          </div>
        <div className='button-container d-flex'>
        <button className='main-buttons btn btn-success' onClick={changedispaly}>Add products</button>
        
        </div>
     </div>

     <ul className='product-admin-container bg-light  d-flex w-100 ' style={{ textDecoration: 'none' }}>
            {products.map(product => (
              <li className='product-admin-container-items  flex-sm-column pt-1 m-4  ' style={{ textDecoration: 'none' }} key={product.id}>
                <div className='product-detalist'>
                <img src={product.imagePath} alt={product.name} className='product-image' />
                <h1>{product.name}</h1>
                <div>{product.price}$</div>
                <div>{product.discription}</div>
                {/* <button className='btn btn-primary' onClick={() => storeToCheckout(product.img_path, product.name, product.prize, product.gender, product.itermscode, useremail)}>Add to checkout</button> */}
                <button className='btn btn-warning' onClick={() => removeproducts(product.code)} >Remove </button>
                </div>
              </li>
            ))}
          </ul>
    </div>
  );
};

export default Admin;
