const express = require('express')
const app = require('./src/app.js')
const mongoose = require('mongoose')
const port = 3000

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



// Connect to DATABASE
const mongoURL= "mongodb://127.0.0.1:27017/users"
// const DATABASE_URL = "";
mongoose.connect(mongoURL, /*{ useNewUrlParser: true, useUnifiedTopology: true }*/);
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to database'))

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
