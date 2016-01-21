'use strict'
var pkg = require('../../package.json')

exports._platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    init: {
      statusbar () {
        // expects data { background: {color: '333', opacity: 0.2}, text: {color: '444', opacity: 0.5}}
        this.send('init', true, (e, data) => {
          var plugin = this.parent
          var platform = this
          var neededDisplay = plugin.display.val
          plugin.set(data)
          plugin.ready.val = true
          setTimeout(function () {
            if (neededDisplay === 'hidden') {
              platform.send('display', 'top')
            } else if (neededDisplay === 'top') {
              platform.send('display', 'overlay')
            } else if (neededDisplay === 'overlay') {
              platform.send('display', 'overlay')
            }
            platform.send('display', neededDisplay)
          }, 500)
        })
      }
    },
    display: {
      // data --> {display: /^(top|hidden|overlay)$/}
      statusbar (data, event) {
        this.send('display', data.display, sent.bind(this, data))
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
