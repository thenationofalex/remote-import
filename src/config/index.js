const Config = {
  db: {
    address: 'localhost',
    port: '27017',
    name: 'remote'
  },
  files: [
    'https://s3-ap-southeast-2.amazonaws.com/localz-code-assessment/sample.csv'
  ]
}

module.exports = Config
