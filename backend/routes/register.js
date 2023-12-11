const bcrypt = require('bcrypt');
const router = require('express').Router();
const mysql = require("mysql")
const db = mysql.createConnection({
    host: "database-1.cur9f5tr5hr1.us-east-2.rds.amazonaws.com",
    user:"admin",
    password:"preHoch99!",
    database:"prison_project"
})
async function hashPassword(password) {
  // Generate a salt
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

router.route('/regi').post(async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    newpassword = await hashPassword(password);
    // Check if the username is already taken
    const checkUserSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserSql, [username], (checkUserErr, checkUserData) => {
      if (checkUserErr) {
        console.error('Database query error: ' + checkUserErr.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (checkUserData.length > 0) {
        return res.status(409).json({ error: 'Username already exists' });
      } else {
        // If the username is not taken, insert the new user into the database
        const insertUserSql = 'INSERT INTO users (password_hash, email, common_identifier) VALUES (?, ?, "enduser")';
        db.query(insertUserSql, [ newpassword, username], (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Database query error: ' + insertErr.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          // Registration successful
          return res.json({ success: true, message: 'Registration successful' });
        });
      }
    });
  });


module.exports = router;