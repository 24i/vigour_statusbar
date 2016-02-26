'use strict'
var bridge = require('vigour-wrapper-bridge')

bridge.label = 'mockBridge'
bridge.mock = {
  methods: {
    init (opts, cb) {
      // init the plugin and get the current status bar configuration
      setTimeout(function () {
        cb && cb(null)
      })
    },
    display (opts, cb) {
      cb && cb(null)
    },
    background (opts, cb) {
      cb && cb(null)
    },
    text (opts, cb) {
      cb && cb(null)
    }
  }
}

delete bridge.send

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    return bridge.mock.methods[fnName](opts, cb)
  }
})

module.exports = bridge
