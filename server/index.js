const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const usermodel = require('./models/user');
const oderedproductmodel = require('./models/oderedproduct');
const productmodel = require('./models/products');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;
const secret = process.env.ACCESS_TOKEN_SECRET; // JWT secret from environment variables

if (!secret) {
  console.error('ACCESS_TOKEN_SECRET is not defined in environment variables');
  process.exit(1); // Exit the process if secret is not defined
}

mongoose.connect('mongodb://localhost:27017/sportsell', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, useremail, password } = req.body;

  if (!useremail || !username || !password || useremail.trim() === '' || username.trim() === '' || password.trim() === '') {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new usermodel({
      username,
      password: hashedPassword,
      email: useremail
    });

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, secret, { expiresIn: '1h' });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { useremail, password } = req.body;

  try {
    const user = await usermodel.findOne({ email: useremail });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, secret, {
        expiresIn: '1h'
      });

      res.json({ message: user.role === "admin" ? 'admin Login successful' : 'user Login successful', token });
    } else {
      res.status(400).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Unauthorized if no token

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user;
    next();
  });
}

app.post('/addproducts',async( req,res)=>{
  const{ name,code,price,description,image,category} =req.body;
  console.log(`${name} ${category} ${code}`)

  if(name.trim() != '' && code.trim() != '' && price.trim() != '' &&  description.trim() != '' &&  image.trim() != ''){
    const newproduct = {
      category:category,
      name: name,
      code: code,
      price: price,// Store the hashed password in the database,
      imagePath:image,
      description:description

    };
    const product = await productmodel.create(newproduct);
    res.status(201).json(product);
  }
}
);

app.post('/removeproducts' ,async (req,res) =>{
  const {code} =req.body;

  const user = await productmodel.findOneAndDelete({ code: code });
  if (user) {
      console.log("User deleted:", user);
  } else {
      console.log("User not found.");
  }
  
})


app.post('/addtocart',async (req,res)=>{
  const {userEmail,imagepath,name,code,price} =req.body;
  console.log(userEmail,imagepath,name,code,price)

  if( userEmail.trim() != '' && imagepath.trim() != '' && name.trim() != '' && code.trim() != ''   ){

    const alredystore = await oderedproductmodel.findOne({ useremail: userEmail, code: code });

    if (alredystore) {
      // If the product already exists, update its quantity
      alredystore.quantity += 1; // Assuming you're incrementing the quantity by 1
      await alredystore.save(); // Save the updated product
      return res.json("Product already stored. Quantity updated.");
    } else {
      // If the product doesn't exist, create a new entry
      const newProduct = {
        useremail: userEmail,
        imagepath: imagepath,
        name: name,
        code: code,
        price: price,
        quantity: 1 // Set the default quantity to 1 for new products
      };
      const orderedStoreProduct = await oderedproductmodel.create(newProduct);
      return res.json(orderedStoreProduct);
    }
    
  }
})

app.post('/fetchdata', async (req, res) => {
try {
  const users = await usermodel.find(); // Assuming usermodel represents your Mongoose model
   // Log the fetched user data
  res.json(users); // Send user data as JSON response
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ message: 'Internal server error' });
}
});




app.post('/fetchproduct', async (req, res) => {
try {
  const { value, reqireiterm } = req.body;
   

  if (reqireiterm.trim() === '') {
    if (value === "All products") {
      const products = await productmodel.find();
      return res.json(products);
    } else {
      const products = await productmodel.find({ category: value });
      return res.json(products);
    }
  } else {
    if (value === "All products") {
      const products = await productmodel.find({ name: { $regex: reqireiterm, $options: 'i' } });
      return res.json(products);
    } else {
      const products = await productmodel.find({ category: value, name: { $regex: reqireiterm, $options: 'i' } });
      return res.json(products);
    }
  }
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ message: 'Internal server error' });
}
});

app.post('/orderedproduct', async (req, res) => {

 const {userEmail}  =req.body;
 
 if(userEmail.trim() != ''){
  const products = await oderedproductmodel.find({ useremail: userEmail });
  res.json(products)
 }
}
)

app.post('/removeorderedproduct', async (req, res) => {

 const {code , userEmail}  =req.body;
 console.log(code,userEmail);
 if(code.trim() != '' && userEmail.trim() != ''){
  const user = await oderedproductmodel.findOneAndDelete({ code: code,useremail : userEmail });
  
 }
}
)


// Other endpoints...

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
