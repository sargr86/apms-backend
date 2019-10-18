const express = require('express');
const app = express();

// const port = 3001;
const server = require('http').createServer(app);
const cors = require('cors');
const  path = require('path');
const config = require('./config/configs');

// Cors
app.use(cors(require('./config/cors')));

const bodyParser = require('body-parser');



//Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/company', require('./routes/company'));
app.use('/users', require('./routes/users'));
app.use('/roles', require('./routes/roles'));


const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/apms', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
//     // console.log(err)
//     // throw new Error(err);
// });

mongoose.connect(config.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    // console.log(err)
    // throw new Error(err);
});

mongoose.set('debug', true);

var db = mongoose.connection;
db.on('error', (err) => {
    // throw  new Error(err);
    // res.json(err)
});
db.once('open', function () {
    // we're connected!
    console.log('Connected to Mongo!!!')
});



module.exports = app;
