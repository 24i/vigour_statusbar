'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')

var Config = require('vigour-config')
var config = new Config().statusbar
console.log('new Config()', config)

var statusbar = module.exports = new Plugin({
  key: 'statusbar',
  inject: [
    config.serialize(),
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
        }
      }
    }
  },
  background: {
    color: {
      on: {
        data: {
          condition (data, done, event) {
            change(this._platform, 'background', {color: data}, done)
          }
        }
      }
    },
    opacity: {
      on: {
        data: {
          condition (data, done, event) {
            change(this._platform, 'background', {opacity: data}, done)
          }
        }
      }
    }
  },
  text: {
    color: {
      on: {
        data: {
          condition (data, done, event) {
            change(this._platform, 'text', {color: data}, done)
          }
        }
      }
    },
    opacity: {
      on: {
        data: {
          condition (data, done, event) {
            change(this._platform, 'text', {opacity: data}, done)
          }
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

var change = (platform, property, value, callback) => {
  platform.emit('change', {
    property: {
      name: property,
      value: value
    },
    done: callback
  })
}
