const moongoose = require('mongoose')
const Schema = moongoose.Schema

const orderSchema = new Schema({
  orderId: {type: String, unique: true, required: true, dropDups: true},
  customerId: {type: moongoose.Schema.Types.ObjectId, ref: 'Customers', required: true},
  item: String,
  quantity: Number
}, {collection: 'Orders'})

module.exports = moongoose.model('Orders', orderSchema)
