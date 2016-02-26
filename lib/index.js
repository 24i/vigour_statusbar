'use strict'
var Plugin = require('vigour-wrapper-bridge/lib/plugin')

var pkg = require('vigour-package')
var config = pkg.statusbar

var statusbar = new Plugin({
  key: 'statusbar',
  inject: [
    config,
    require('./platform')
  ],
  display: {
    on: {
      data: {
        condition (data, done, event) {
          var val = this.val
          if (val.match(/^(top|hidden|overlay)$/)) {
            this._platform.emit('display', {display: val, done: done})
          }
        },
        val: function () {}
      }
    }
  },
  background: {
    color: {
      on: {
        data: {
          condition (data, done, event) {
            change(this._platform, 'background', {color: this.val}, done)
          },
          val: function () {}
        }
      }
    },
    opacity: {
      on: {
        data: {
          condition (data, done, event) {
            change(this._platform, 'background', {opacity: this.val}, done)
          },
          val: function () {}
        }
      }
    }
  },
  text: {
    color: {
      on: {
        data: {
          condition (data, done, event) {
            change(this._platform, 'text', {color: this.val}, done)
          },
          val: function () {}
        }
      }
    },
    opacity: {
      on: {
        data: {
          condition (data, done, event) {
            change(this._platform, 'text', {opacity: this.val}, done)
          },
          val: function () {}
        }
      }
    }
  },
  on: {
    data: {
      statusbar () {
        this._platform.emit('init')
      }
    }
  }
})

statusbar.val = true

module.exports = statusbar

var change = (platform, property, value, callback) => {
  platform.emit('change', {
    property: {
      name: property,
      value: value
    },
    done: callback
  })
}
