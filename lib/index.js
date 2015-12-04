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
  background: {
    color: {
      val: false,
      on: {
        data: {
          condition (data, done, event) {
            change(this.platform, 'background', {color: data}, done)
          }
        }
      }
    },
    opacity: {
      val: false,
      on: {
        data: {
          condition (data, done, event) {
            change(this.platform, 'background', {opacity: data}, done)
          }
        }
      }
    }
  },
  text: {
    color: {
      val: false,
      on: {
        data: {
          condition (data, done, event) {
            change(this.platform, 'text', {color: data}, done)
          }
        }
      }
    },
    opacity: {
      val: false,
      on: {
        data: {
          condition (data, done, event) {
            change(this.platform, 'text', {opacity: data}, done)
          }
        }
      }
    }
  },
  on: {
    data: {
      statusbar () {
        console.log('onData')
        this.platform.emit('init')
      }
    }
  }
})

var change = (platform, property, value, callback) => {
  console.log('change', platform)
  platform.emit('change', {
    property: {
      name: property,
      value: value
    },
    done: callback
  })
}
