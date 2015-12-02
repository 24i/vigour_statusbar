'use strict'
var pkg = require('../../package.json')

exports.platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    init: {
      statusbar () {
        // expects data { background: {color: '333', opacity: 0.2}, text: {color: '444', opacity: 0.5}}
        this.send('init', (e, data) => {
          this.parent.set(data)
        })
      }
    },
    display: {
      // data --> {display: /^(top|hidden|overlay)$/}
      statusbar (data, event) {
        this.send('display', data.display, (err) => {
          if (err) {
            data.done(true)
            return
          }
          data.done()
        })
      }
    },
    change: {
      // data --> {property: /^(backround|text)$/, conf: {text: {color: '333', opacity: 0.2}, background: {color: '333', opacity: 0.2}}, done: done}
      statusbar (data, event) {
        this.send(data.property, data.conf, (err) => {
          if (err) {
            data.done(true)
            return
          }
          data.done()
        })
      }
    }
  }
}
