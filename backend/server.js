const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const app = express()
const port = process.env.PORT || 3005;

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }))
app.use(express.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, sameSite: 'none'  // Set to true if using HTTPS
    },
  })
);

const loginRouter = require('./routes/login');
const mainPageRouter = require('./routes/mainPage');
const registerRouter = require('./routes/register');
app.use('/login', loginRouter);
app.use('/main_page', mainPageRouter);
app.use('/register', registerRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})
