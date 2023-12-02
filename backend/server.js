const express = require('express')
const mysql = require("mysql")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 3005;
app.use(cors())
app.use(express.json());


// const uri = process.env.ATLAS_URI;
const loginRouter = require('./routes/login');

app.use('/login', loginRouter);
// const db = mysql.createConnection({
//     host: "database-1.cur9f5tr5hr1.us-east-2.rds.amazonaws.com",
//     user:"admin",
//     password:"preHoch99!",
//     database:"prison_project"
// })


// app.get("/login", (req,res) => {
//     const sql = "SELECT * FROM Appeal";
//     db.query(sql, (err, data)=> {
//         if(err) return res.json(err);
//         return res.json(data);
//     })
// })

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})
