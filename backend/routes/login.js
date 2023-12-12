const router = require('express').Router();
const mysql = require("mysql")
const db = mysql.createConnection({
    host: "database-1.cur9f5tr5hr1.us-east-2.rds.amazonaws.com",
    user:"admin",
    password:"preHoch99!",
    database:"prison_project"
})
const bcrypt = require('bcrypt');


async function verifyPassword(inputPassword, hashedPassword) {
  const passwordMatch = await bcrypt.compare(inputPassword, hashedPassword);
  return passwordMatch;
}


router.route('/log').post((req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [username], async (err, data) => {
    if (err) {
      console.error('Database query error: ' + err.stack);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
      const hashedPasswordFromDB = data[0].password_hash;
      // Verify the provided password with the hashed password from the database
      const passwordMatch = await verifyPassword(password, hashedPasswordFromDB);

      if (passwordMatch) {
        const userId = data[0].common_identifier;
        // console.log(userId)
        // Store userId in the session
        req.session.userId = userId;
        // res.cookie('sessionId', `${userId}_${req.sessionID}`, {
        //   maxAge: null, secure: true, httpOnly: true, sameSite: 'none'
        // });

        return res.json({ success: true, message: 'Login successful' , userRole: userId});
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

  module.exports = router;