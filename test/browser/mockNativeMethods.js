'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

var mockMethods = {
  init (opts, cb) {
    // init the plugin and get the current status bar configuration
    setTimeout(function () {
      cb && cb(null)
    })
  },
  display (opts, cb) {
    console.log('native display mock', opts)
    cb && cb(null)
  },
  background (opts, cb) {
    console.log('native background mock', opts)
    cb && cb(null)
  },
  text (opts, cb) {
    console.log('native text mock', opts)
    cb && cb(null)
  }
}

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    return mockMethods[fnName](opts, cb)
  }
})

exports.inject = require('../../lib/platform/native')
