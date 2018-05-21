const mongoose = require('mongoose')
const Config = require('../src/config').db
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect

const { StoreData } = require('../src/store-data')
const Customers = require('../src/db/customer-schema')

chai.use(chaiAsPromised)

mongoose.connect(`mongodb://${Config.address}:${Config.port}/test-${Config.name}`)
mongoose.Promise = require('bluebird')
const db = mongoose.connection
db.on('error', () => {
  throw Error(`🔥 Failed to connect to db`)
})
db.once('open', () => {})

describe('Test StoreData', () => {
  before(done => {
    Customers.create({
      customerId: 'customer-321'
    }).then(result => {
      done()
    })
  })

  describe('Saving orders', () => {
    it('Saves a new order', (done) => {
      const testData =[{
        orderId: 'sample-123',
        customerId: 'customer-321',
        item: 'Flowers',
        quantity: '2'
      }]
      const storeData = new StoreData(testData)
      storeData.insertRecords()
        .then(async results => {
          expect(results[0].customerId).to.deep.equal('customer-321')
          done()
        })
    })

    it('Skips a bad order', (done) => {
      const testData =[{
        orderId: 'sample-123',
        customerId: 'customer-xyz',
        item: 'Flowers',
        quantity: '2'
      }]
      const storeData = new StoreData(testData)
      storeData.insertRecords()
        .then(results => {
          expect(results).to.deep.equal([null])
          done()
        })
    })
  })


  after(done => {
    db.dropDatabase(() => {
      db.close(done)
    })
  })

})
