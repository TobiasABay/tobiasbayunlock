const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_database'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.post('/addRow', (req, res) => {
  const { website, email, password } = req.body;
  const query = 'INSERT INTO passwords (website, email, password) VALUES (?, ?, ?)';
  db.query(query, [website, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.json({ id: result.insertId });  // Returner det genererede ID
  });
});

app.get('/getRows', (req, res) => {
  const query = 'SELECT * FROM passwords';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

app.delete('/removeRow/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM passwords WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.send('Row removed');
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

