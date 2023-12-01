const express = require('express')
const mysql = require("mysql")
const cors = require("cors")

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "database-1.cur9f5tr5hr1.us-east-2.rds.amazonaws.com",
    user:"admin",
    password:"preHoch99!",
    database:"prison_project"
})


app.get("/login", (req,res) => {
    const sql = "SELECT * FROM Appeal";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(3000, ()=>{
    console.log("listening");
})