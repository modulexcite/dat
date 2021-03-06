var pump = require('pump')
var debug = require('debug')('bin/read')
var openDat = require('../lib/util/open-dat.js')
var abort = require('../lib/util/abort.js')
var usage = require('../lib/util/usage.js')('read.txt')

module.exports = {
  name: 'read',
  command: handleRead,
  options: [
    {
      name: 'dataset',
      boolean: false,
      abbr: 'd'
    }
  ]
}

function handleRead (args) {
  debug('handleRead', args)

  if (args.help || args._.length === 0) {
    return usage()
  }

  if (!args.dataset) abort(new Error('Error: Must specify dataset (-d)'), args)

  openDat(args, function (err, db) {
    if (err) abort(err, args)

    var key = args._[0]
    var opts = {
      dataset: args.d
    }

    debug(key, opts)

    pump(db.createFileReadStream(key, opts), process.stdout, function done (err) {
      if (err) abort(err, args, 'dat: err in read')
    })
  })

}
