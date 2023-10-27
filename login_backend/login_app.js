const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose(); // Import the sqlite3 package

const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.json());

// Create or open an SQLite database
const db = new sqlite3.Database('db/login_db.sqlite');

// Define the users table
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, password_hash TEXT NOT NULL)");
});

// User login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Database error' });
    } else if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      bcrypt.compare(password, user.password_hash, (err, passwordMatch) => {
        if (passwordMatch) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
