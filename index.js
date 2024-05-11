const express = require('express')
const app = require('./src/app.js')
const mongoose = require('mongoose')
const port = 3000

// const subscriberModel = require('./src/models/subscribers.js');

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
// const mongoURL= "mongodb://127.0.0.1:27017/users"
const DATABASE_URL = "mongodb+srv://skkhot29:Sushant4575@users.fsy8yso.mongodb.net/";
mongoose.connect(DATABASE_URL, /*{ useNewUrlParser: true, useUnifiedTopology: true }*/);
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to database'))

//Import the router files
const subscribersRoute = require('./src/routes/subscribersRoute.js');
app.use('/subscribers', subscribersRoute);

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
