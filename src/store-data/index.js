const Customers = require('../db/customer-schema')
const Orders = require('../db/order-schema')
const Promise = require('bluebird')

class StoreData {
  constructor (records) {
    this.records = records
  }
  async insertRecords () {
    let promises = []
    this.records.map(row => {
      promises.push(
        Customers.findOne({customerId: row.customerId})
          .then(async result => {
            if (result) {
              await Orders.create({
                orderId: row.orderId,
                customerId: result,
                item: row.item,
                quantity: row.quantity
              })
                .then(order => {
                  console.log(`👍 Inserted Order ${order.id}`)
                  return order
                })
                .catch(e => {
                  console.log(`🔥 Error Inserting order ${e}`)
                })
            } else {
              console.log(`😭 Skipping order ${row.orderId} - Customer ${row.customerId} does not exist`)
            }
            return result
          })
      )
    })
    return Promise.all(promises)
      .then(results => {
        return results
      })
  }
}

module.exports = {StoreData}
