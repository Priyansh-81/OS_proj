const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
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

app.post('/api/register', (req, res) => {
  console.log('Received registration request:', req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  // Get the next UserID manually
  db.query('SELECT MAX(UserID) AS maxId FROM Users', (err, result) => {
    if (err) {
      console.error('Error fetching max UserID: ', err);
      return res.status(500).json({ error: 'Registration failed.' });
    }

    const nextUserID = (result[0].maxId || 0) + 1;

    const query = 'INSERT INTO Users (UserID, Name, Email, Password) VALUES (?, ?, ?, ?)';
    db.query(query, [nextUserID, name, email, password], (err, result) => {
      if (err) {
        console.error('Error inserting user: ', err);
        return res.status(500).json({ error: 'Registration failed.' });
      }
      res.status(200).json({ message: 'Registration successful!' });
    });
  });
});
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const query = 'SELECT * FROM Admin WHERE Email = ? AND Password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error fetching admin: ', err);
      return res.status(500).json({ error: 'Login failed.' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful!', admin: results[0] });
    } else {
      res.status(401).json({ error: 'Invalid email or password.' });
    }
  });
});

app.post('/api/user/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const query = 'SELECT * FROM Users WHERE Email = ? AND Password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error fetching user: ', err);
      return res.status(500).json({ error: 'Login failed.' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'User login successful!', user: results[0] });
    } else {
      res.status(401).json({ error: 'Invalid user email or password.' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});