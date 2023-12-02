const express = require('express')
const mysql = require("mysql")
const cors = require("cors")
const bodyParser = require('body-parser');

const app = express()

app.use(cors())

app.use(bodyParser.json());

// const db = mysql.createConnection({
//     host: "database-1.cur9f5tr5hr1.us-east-2.rds.amazonaws.com",
//     user:"admin",
//     password:"preHoch99!",
//     database:"prison_project"
// })

const loginRouter = require('./routes/login')

// app.post('/', (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ error: 'Username and password are required' });
//     }
//     const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
//     db.query(sql, [username, password], (err, data) => {
//       if (err) {
//         console.error('Database query error: ' + err.stack);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//       if (data.length > 0) {
//         return res.json({ success: true, message: 'Login successful' });
//       } else {
//         return res.status(401).json({ error: 'Invalid username or password' });
//       }
//     });
//   });

app.use('/login', loginRouter);

app.listen(3000, ()=>{
    console.log("listening");
})