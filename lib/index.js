var bridge = require('vigour-native/lib/bridge')
var pkg = require('../package.json')
var pluginId = pkg.plugin.id

module.exports = exports = {}

exports.get = function (opts, cb) {
  bridge.send(pluginId, 'get', opts, cb)
}

exports.set = function (opts, cb) {
  bridge.send(pluginId, 'set', opts, cb)
}
