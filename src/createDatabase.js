const mongoose = require('mongoose')
const subscriberModel = require('./models/subscribers')
const data = require('./data')


const refreshAll = async () => {
    await subscriberModel.deleteMany({})
    // console.log(connection)
    await subscriberModel.insertMany(data)
    await mongoose.disconnect();
}
refreshAll()