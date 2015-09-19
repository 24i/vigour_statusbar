var bridge = require('vigour-native/lib/bridge')
var pluginId = 'statusbar'

module.exports = exports = {}

exports.get = function (opts, cb) {
  bridge.send(pluginId, 'get', opts, cb)
}

exports.set = function (opts, cb) {
  bridge.send(pluginId, 'set', opts, cb)
}
