const Config = require('./config')
const { RetrieveFile } = require('./retrieve-file')
const { ProcessFile } = require('./process-file')
const { StoreData } = require('./store-data')
const db = require('./db')

Config.files.forEach(url => {
  try {
    const retrieveFile = new RetrieveFile(url)
    retrieveFile.getStream()
      .then(fileData => {
        const processFile = new ProcessFile(fileData)
        processFile.prepareRecords()
          .then(stream => {
            const storeData = new StoreData(stream)
            storeData.insertRecords()
              .then(async results => {
                console.log(`🎉 Orders Imported`)
                db.close()
              })
          })
      })
  } catch (e) {
    console.log(e)
  }
})
