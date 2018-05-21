const mongoose = require('mongoose')
const Config = require('../config').db

mongoose.connect(`mongodb://${Config.address}:${Config.port}/${Config.name}`)
mongoose.Promise = require('bluebird')

const db = mongoose.connection

db.on('error', () => {
  throw Error(`🔥 Failed to connect to db`)
})

module.exports = db
