const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect

chai.use(chaiAsPromised)

const { ProcessFile } = require('../src/process-file')

describe('Test ProcessFile', () => {
  it('Convert raw data into object', (done) => {
    const sampleCSV = `orderId,customerId,item,quantity
sample-123,customer-321,Flowers,2`
    const expectedObject =[{
      orderId: 'sample-123',
      customerId: 'customer-321',
      item: 'Flowers',
      quantity: '2'
    }]

    const processFile = new ProcessFile(sampleCSV)
    const prepareRecords = processFile.prepareRecords()
    prepareRecords.then(res => {
      expect(res).to.deep.equal(expectedObject)
      done()
    })
  })
})
