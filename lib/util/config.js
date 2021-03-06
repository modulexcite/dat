var fs = require('fs')
var abort = require('./abort.js')

var CONFIG_FILE = 'dat.json'

module.exports = function () {
  var config

  if (fs.existsSync(CONFIG_FILE)) {
    var contents = fs.readFileSync(CONFIG_FILE)
    try {
      config = JSON.parse(contents)
    } catch (err) {
      console.error('Your dat.json file is malformed.')
      abort(err)
    }
  } else {
    config = {}
  }
  return config
}
