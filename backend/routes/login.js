const router = require('express').Router();
const mysql = require("mysql")
const db = mysql.createConnection({
    host: "database-1.cur9f5tr5hr1.us-east-2.rds.amazonaws.com",
    user:"admin",
    password:"preHoch99!",
    database:"prison_project"
})

router.route('/log').post((req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const sql = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
    db.query(sql, [username, password], (err, data) => {
      if (err) {
        console.error('Database query error: ' + err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (data.length > 0) {
        return res.json({ success: true, message: 'Login successful' });
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });

  module.exports = router;