const mongoose = require('mongoose')
const subscriberModel = require('./models/subscribers')
const data = require('./data')

// Connect to DATABASE
// const mongoURL= "mongodb://127.0.0.1:27017/users"
// mongoose.connect(mongoURL,{ useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection

// db.on('error', (err) => console.log(err))
// db.once('open', () => console.log('Database created...'))

// module.exports= db


const refreshAll = async () => {
    await subscriberModel.deleteMany({})
    // console.log(connection)
    await subscriberModel.insertMany(data)
    await mongoose.disconnect();
}
refreshAll()