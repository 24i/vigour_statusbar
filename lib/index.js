'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')

module.exports = new Plugin({
  inject: require('./platform'),
  display: {
    val: false,
    on: {
      value: {
        condition (data, done, event) {
          var val = this.val
          if (val.match(/^(top|hidden|overlay)$/)) {
            this.platform.emit('display', {display: val, done: done})
          }
        }
      }
    }
  },
  background: require('./confProperties'),
  text: require('./confProperties'),
  on: {
    data: {
      statusbar () {
        this.platform.emit('init')
      }
    }
  }
})
