const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const port = 3000;

const bcrypt = require('bcrypt');

// Example of hashing a password
const plainPassword = 'mySecurePassword';
const saltRounds = 10;


const pool = new pg.Pool({
  user: 'your_postgres_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_postgres_password',
  port: 5432,
});

// bycrypt 
bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed Password:', hash);

    // Example of comparing a password with its hash
    bcrypt.compare('anotherPassword', hash, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
      } else {
        console.log('Passwords Match:', result);
      }
    });
  }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

    if (result.rows.length === 1) {
      res.redirect('/index.html');
    } else {
      res.status(401).send('Invalid credentials!');
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Add try...finally for proper resource cleanup
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('Pool has ended');
    process.exit(0);
  });
});




