const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors')
const bodyParser = require('body-parser');
const usermodel =require('./models/user')
const oderedproductmodel =require('./models/oderedproduct')
const productmodel =require('./models/products')
const bcrypt = require('bcrypt');

 
const app = express();
app.use(cors())
const port = 5000;
app.use(bodyParser.json());
 
 
mongoose.connect('mongodb://localhost:27017/sportsell', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Register endpoint
app.post('/register', async (req, res) => {

  const { username, useremail,password } = req.body;
  console.log(`${username} ${password} ${useremail}`);
  // Validate user input (e.g., check if email is valid, name is provided, etc.)
  if (!useremail || !username || !password || useremail.trim() === '' || username.trim() === '' || password.trim() === '') {
    return res.status(400).json({ message: "Please provide all required fields" });
  }else{

    const hashedPassword = await bcrypt.hash(password, 10);
  // Create user object with hashed password
    const newUser = {
      username: username,
      password: hashedPassword,
      email: useremail// Store the hashed password in the database
    };

  // Save user data to the database
  const user = await usermodel.create(newUser);

  res.status(201).json(user);
  // Respond with the newly created user
  }  
});

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


app.post('/login', async (req, res) => {
  const { useremail, password } = req.body;

  try {
    // Find the user by username
    const user = await usermodel.findOne({ email: useremail });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
     if(user.role=="admin"){
      res.json( 'admin Login successful' );
     }else{
      res.json( 'user Login successful' );
     }
      
    } else {
      res.json( 'Incorrect password' );
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

 
 

app.get('/', (req, res) => {
  res.send('Server is running');
});

 

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});