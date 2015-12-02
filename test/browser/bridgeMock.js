'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

var mockMethods = {
  init (opts, cb) {
    // init the plugin and get the current status bar configuration
    setTimeout(function () {
      cb && cb(null, {
        ready: true,
        display: 'top',
        background: {
          color: '333',
          opacity: 0.5
        },
        text: {
          color: '333',
          opacity: 0.5
        }
      })
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

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    return mockMethods[fnName](opts, cb)
  }
})

exports.inject = require('../../lib/platform/native')
