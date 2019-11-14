"use strict";

const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

const PORT = 8082
const app = express()

const Server = http.createServer(app)

//Set up default mongoose connection
let mongoDB = 'mongodb://127.0.0.1/calendario';
mongoose.connect(mongoDB, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/events', Routing)

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
