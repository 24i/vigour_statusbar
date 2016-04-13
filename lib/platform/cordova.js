'use strict'

exports._platform = {
  on: {
    display: {
      // data --> {display: /^(top|hidden|overlay)$/}
      statusbar (data, event) {
        console.log('[cordova][statusbar][display] APP >>>> PLATFORM', data)
      }
    },
    change: {
      // data --> { property: { name: 'background', value: { opacity: 0.9 }}, done: done }
      // or data --> { property: { name: 'background', value: { color: '333' }}, done: done }
      statusbar (data, event) {
        console.log('[cordova][statusbar][change] APP >>>> PLATFORM', data)
      }
    }
  }
}
