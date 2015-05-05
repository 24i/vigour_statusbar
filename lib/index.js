var bridge = require("vigour-native/lib/bridge")
  , pkg = require('../package.json')
  , pluginId = pkg.plugin.id

module.exports = exports = {}

exports.get = function (opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }
  bridge.call(pluginId, 'get', opts, cb)
}

exports.set = function (opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  }
  bridge.call(pluginId, 'set', opts, cb)
}