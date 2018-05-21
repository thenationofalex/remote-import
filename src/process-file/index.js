const csv = require('csv-parse/lib/sync')

class ProcessFile {
  constructor (data) {
    this.data = data
  }
  prepareRecords () {
    return new Promise((resolve) => {
      const stream = csv(this.data, {
        columns: true,
        skip_lines_with_error: true,
        skip_lines_with_empty_values: true
      })
      resolve(stream)
    })
  }
}

module.exports = {ProcessFile}
