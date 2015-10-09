'use strict'

var BridgeObservable = require('vigour-native/lib/bridge/BridgeObservable')
var Plugin = require('vigour-native/lib/bridge/Plugin')
var name = require('../package.json').name

var AlphaColor = new BridgeObservable({
  color: {
    // condition: {
    //   $hex: 'color'
    // }
  },
  opacity: {
    // condition: {
    //   $number: 'percentage'
    // }
  },
  useVal: true
}).Constructor

module.exports = exports = new Plugin({
  key: name,
  background: new AlphaColor(),
  foreground: new AlphaColor(),
  display: {}
})
