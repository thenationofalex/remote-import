const http = require('http')
const https = require('https')
const validUrl = require('valid-url')

class RetrieveFile {
  constructor (url) {
    this.url = url
  }
  getStream () {
    if (validUrl.isHttpsUri(this.url)) {
      return new Promise((resolve, reject) => {
        https.get(this.url, resp => {
          resp.on('data', chunk => {
            resolve(chunk.toString('utf-8'))
          })
        })
      })
    } else if (validUrl.isHttpUri(this.url)) {
      return new Promise((resolve, reject) => {
        http.get(this.url, resp => {
          resp.on('data', chunk => {
            resolve(chunk.toString('utf-8'))
          })
        })
      })
    } else {
      throw Error(`🔥 Invalid url: ${this.url} - Skipping`)
    }
  }
}

module.exports = {RetrieveFile}
