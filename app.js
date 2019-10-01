const express = require('express');
const app = express();

const port = 3000;
const server = require('http').createServer(app);
const cors = require('cors');

// Cors
app.use(cors(require('./config/cors')));

const bodyParser = require('body-parser');

// Start server on pre-defined port
server.listen(port, () => {
    console.log('server is listening on port ' + port)
});


//Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/auth', require('./routes/auth'));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/apms', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
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
