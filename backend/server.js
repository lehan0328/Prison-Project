const express = require('express')
const mysql = require("mysql")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 3005;
app.use(cors())
app.use(express.json());


// const uri = process.env.ATLAS_URI;
const loginRouter = require('./routes/login');
const mainPageRouter = require('./routes/mainPage');

app.use('/login', loginRouter);
app.use('/main_page', mainPageRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})
