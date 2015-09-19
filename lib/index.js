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
        // var _this = this
        bridge.send(this.key, 'set', this.convert({ raw: true }), function (err) {
          if (err) {
            condition.cancel(err)
            // _this.emit('error', void 0, err)
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

module.exports = exports = new Plugin({
  key: name,
  background: {
    color: {
      condition: {
        color: true
      }
    },
    opacity: {}
  },
  text: {
    color: {},
    opacity: {}
  },
  display: {}
})
