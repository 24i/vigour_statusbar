var pkg = require('../package.json')
  , pluginId = pkg.plugin.id

module.exports = exports = {}

exports.get = function (opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }
  try {
    window.vigourNative.bridge.call(pluginId, 'get', opts, cb)
  } catch (e) {
    cb(e)
  }
}

exports.set = function (opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }
  try {
    window.vigourNative.bridge.call(pluginId, 'set', opts, cb)
  } catch (e) {
    cb(e)
  }
}