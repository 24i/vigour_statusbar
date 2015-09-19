'use strict'

var Observable = require('vjs/lib/observable')
var bridge = require('vigour-native/lib/bridge')
var name = require('../package.json').name

/* START : Will be moved to the bridge */

var BridgeObservable = new Observable({
  on: {
    change: {
      bridge: function (event) {
        this.getRoot().emit('bridge', event, this)
      }
    }
  },
  ChildConstructor: 'Constructor'
}).Constructor

var Plugin = new Observable({
  on: {
    bridge: {
      condition: function (next, event, condition, meta) {
        bridge.send(this.key, 'set', this.convert({ raw: true }), function (err) {
          if (err) {
            condition.cancel(err)
          } else {
            next()
          }
        })
      }
    }
  },
  ChildConstructor: BridgeObservable
}).Constructor
/* END */

var AlphaColor = new BridgeObservable({
  color: {
    condition: {
      $hex: 'color'
    }
  },
  opacity: {
    condition: {
      $number: 'percentage'
    }
  },
  useValue: true
}).Constructor

module.exports = exports = new Plugin({
  key: name,
  background: new AlphaColor(),
  text: new AlphaColor(),
  display: {}
})
