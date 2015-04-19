var android = require('./android')
  , ios = require('./ios')

module.exports = exports = {}

exports.get = function (opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }
  cb(null)
}

exports.set = function (opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }
  cb(null)
}

exports.hide = function (cb) {
  cb(null)
}

exports.show = function (cb) {
  cb(null)
}

