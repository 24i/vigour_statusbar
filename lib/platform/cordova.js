'use strict'

var cordovaReady
var plugin

exports._platform = {
  inject: function (base) {
    setTimeout(function () {
      plugin = base.parent
      if (cordovaReady) {
        plugin.ready.val = true
      }
    })
  },
  on: {
    display: {
      // data --> {display: /^(top|hidden|overlay)$/}
      statusbar (data, event) {
        var val = data.display

        if (val === 'hidden') {
          // console.log('call StatusBar.hide()')
          window.StatusBar.hide()
        } else {
          // console.log('call StatusBar.show()')
          window.StatusBar.show()
          // if (val === 'overlay') {
          //   StatusBar.overlaysWebView(true)
          // } else if (val === 'top') {
          //   StatusBar.overlaysWebView(false)
          // }
        }
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

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady () {
  // console.log('======= [cordova][statusbar] cordovaReady!')
  cordovaReady = true
  if (plugin) {
    // console.log('======= [cordova][statusbar] YES ALSO HAVE PLYGIN DO TRUE!')
    plugin.ready.val = true
  }
}
