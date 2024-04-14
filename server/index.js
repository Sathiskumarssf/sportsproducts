const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors')
const bodyParser = require('body-parser');
const usermodel =require('./models/user')
 
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
 
 

app.post('/register', (req, res) => {

   usermodel.create(req.body)
   .then(user1 => res.json(user1))
   .catch(err => res.json(err))
  // Your login logic goes here
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