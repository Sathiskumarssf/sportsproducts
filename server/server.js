const express = require('express');
const bodyParser = require('body-parser');
 
const cors  = require('cors')
const app = express();
app.use(cors())
const port = 5000;

// Create connection to MySQL database
 

// Connect to MySQL
 

// Middleware
app.use(bodyParser.json());

// Register endpoint
 

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`${username},${password}`);
  res.send()
  // Your login logic goes here
});

 

app.get('/', (req, res) => {
  res.send('Server is running');
});

 

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});