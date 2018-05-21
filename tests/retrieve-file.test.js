const expect = require('chai').expect
const { RetrieveFile } = require('../src/retrieve-file')

describe('Test RetrieveFile', () => {
  it('Stream the CSV file', (done) => {
    const testFile = 'https://s3-ap-southeast-2.amazonaws.com/localz-code-assessment/sample.csv'
    const manageFiles = new RetrieveFile(testFile)
    const stream = manageFiles.getStream()
    stream.then(fileData => {
      expect(typeof fileData).to.equal('string')
      done()
    })
  })
  it('Error is thrown on invalid URL', () => {
    const testFile = 'not-a-domain'
    const manageFiles = new RetrieveFile(testFile)
    expect(() => {
      manageFiles.getStream()
    }).to.throw('🔥 Invalid url: not-a-domain - Skipping')
  })
})
