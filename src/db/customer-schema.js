const moongoose = require('mongoose')
const Schema = moongoose.Schema

const customerSchema = new Schema({
  customerId: {type: String, unique: true, required: true, dropDups: true},
  firstName: String,
  lastName: String
}, {collection: 'Customers'})

module.exports = moongoose.model('Customers', customerSchema)
