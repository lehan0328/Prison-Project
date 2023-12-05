const router = require('express').Router();
const mysql = require("mysql")
const db = mysql.createConnection({
    host: "database-1.cur9f5tr5hr1.us-east-2.rds.amazonaws.com",
    user:"admin",
    password:"preHoch99!",
    database:"prison_project"
})
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  // Generate a salt
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

async function verifyPassword(inputPassword, hashedPassword) {
  const passwordMatch = await bcrypt.compare(inputPassword, hashedPassword);
  return passwordMatch;
}


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
      // if (data && verifyPassword(data[0].password_passwprd)){
      if (data.length > 0) {
        const userId = data[0].common_identifier;
        // Store userId in the session
        req.session.userId = userId;
        // console.log(req.session.userId)
        return res.json({ success: true, message: 'Login successful' });
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });

  module.exports = router;