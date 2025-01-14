const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path'); // Import path module to locate HTML file
const app = express();

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_database_name'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (including HTML file)
app.use(express.static(path.join(__dirname, 'public'))); // Place your HTML in a folder named 'public'

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  const query = `INSERT INTO users (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`;
  db.query(query, [firstName, lastName, email, phone], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Form submission failed. Please try again.');
    } else {
      res.send('Form submitted successfully!');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
