'use strict'

var BridgeObservable = require('vigour-wrapper/lib/bridge/bridgeobservable')
var Plugin = require('vigour-wrapper/lib/bridge/plugin')
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
