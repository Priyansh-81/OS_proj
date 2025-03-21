const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import CORS

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true })); 

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rubal123',
  database: 'Recipe_Recommendation'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Handle registration route
app.post('/api/register', async (req, res) => {
  console.log('Received registration request:', req.body); // Log the request body

  let { userID, name, email, password } = req.body;

  if (!userID || !name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  userID = parseInt(userID);
  if (isNaN(userID)) {
    return res.status(400).json({ error: 'UserID must be a valid integer!' });
  }
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error inserting user: ', err);  // Log the error here
      return res.status(500).json({ error: 'Registration failed.' });
    }
    res.status(200).json({ message: 'Registration successful!' });
  });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO Users (UserID, Name, Email, Password) VALUES (?, ?, ?, ?)';
    db.query(query, [userID, name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting user: ', err); // Log the error
        return res.status(500).json({ error: 'Registration failed.' });
      }
      res.status(200).json({ message: 'Registration successful!' });
    });
  } catch (error) {
    console.error('Error during registration: ', error); // Log the error
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});