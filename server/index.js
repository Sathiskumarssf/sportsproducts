const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors')
const bodyParser = require('body-parser');
const usermodel =require('./models/user')
const bcrypt = require('bcrypt');

 
const app = express();
app.use(cors())
const port = 5000;
app.use(bodyParser.json());
// Create connection to MySQL database
 
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

app.post('/fetchdata', async (req, res) => {
  try {
    const users = await usermodel.find(); // Assuming usermodel represents your Mongoose model
    console.log(users); // Log the fetched user data
    res.json(users); // Send user data as JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post ('/login',(req,res) =>{
  const {username,password} =req.body;
  usermodel.findOne({ username: username })
  .then((user) => {
    if (user) {
      res.json("User already exists"); // Change this to an object or an appropriate response
    } else {
     res.json('user name ninvalid')
    }
  })
  .catch((err) => {
    // Handle errors
  });
  
})
 

app.get('/', (req, res) => {
  res.send('Server is running');
});

 

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});