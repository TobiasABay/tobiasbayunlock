const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../.env' });

const PORT = process.env.REACT_APP_PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tobiasbayhub'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Using database: ' + db.config.database);  // This will log the database name being used
  console.log(PORT);

});


//Password Page
//----------------------------------------------------------------------------------------//

app.post('/addRow', (req, res) => {
  const { website, email, password } = req.body;
  const query = 'INSERT INTO entry (website, email, password) VALUES (?, ?, ?)';
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
  const query = 'SELECT * FROM entry';
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
  const query = 'DELETE FROM entry WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.send('Row removed');
  });
});

//Password Page
//----------------------------------------------------------------------------------------//


app.post('/addBlocks', (req, res) => {
  const { title, amount, ingredient, description } = req.body;
  const query = 'INSERT INTO recipes (title, amount, ingredient, description) VALUES (?, ?, ?, ?)';
  db.query(query, [title, amount, ingredient, description], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.json({ id: result.insertId });  // Return the generated ID
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
