const express = require('express')
const port = 8000
const app = express();
const cors = require('cors');
const db = require('./config/mongoose')
const middleware = require('./middleware/_school')

app.use(cors('*'));
app.use(express.urlencoded());

const passport = require('passport')
const passportJwt = require('./config/passport-jwt-strategy')



app.use('/',middleware.school)
app.use(passport.initialize());
app.use('/', require('./routes/index'))

app.listen(port, (err)=> {
     console.log(err || `Successfully connnected to server at port ${port}`);
})
