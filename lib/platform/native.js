'use strict'
var pkg = require('../../package.json')
var injection = require('vigour-wrapper-bridge/lib/plugin/injection')(pkg.name)
/* dirty devving because platform differences */
var env = require('vigour-env')
var platform = env.platform.val
/* dirty devving because platform differences */
exports._platform = {
  inject: injection,
  ready: {
    on: {
      data: {
        bridge_default: null
      }
    }
  },
  on: {
    init: {
      statusbar () {
        // expects data { background: {color: '333', opacity: 0.2}, text: {color: '444', opacity: 0.5}}
        this.send('init', true, (e, data) => {
          var plugin = this.parent
          var platform = this
          var neededDisplay = plugin.display.val
          var backgroundColor = plugin.background.color.val
          var textColor = plugin.text.color.val
          // plugin.set(data, false)
          plugin.ready.val = true
          if (platform === 'ios') {
            platform.send('display', {display: neededDisplay}, doNothing)
          } else {
            platform.send('display', neededDisplay, doNothing)
          }
          
          platform.send('background', { color: backgroundColor }, doNothing)
          platform.send('text', { color: textColor }, doNothing)

        })
      }
    },
    display: {
      // data --> {display: /^(top|hidden|overlay)$/}
      statusbar (data, event) {
        // console.error('[statusbar] >>>> SENDING >>>>', data.display)
        if (platform === 'ios') {
          this.send('display', {display: data.display}, sent.bind(this, data))
        } else {
          this.send('display', data.display, sent.bind(this, data))
        }
        
      }
    },
    change: {
      // data --> { property: { name: 'background', value: { opacity: 0.9 }}, done: done }
      // or data --> { property: { name: 'background', value: { color: '333' }}, done: done }
      statusbar (data, event) {
        this.send(data.property.name, data.property.value, sent.bind(this, data))
      }
    }
  }
}

function sent (data, err) {
  if (err) {
    data.done(true)
    return
  }
  data.done()
}

function doNothing () {}
