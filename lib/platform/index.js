'use strict'

var webview = require('vigour-ua/navigator').webview
var platform

if (webview) {
  switch (webview) {
    case 'wrapper':
      platform = require('./wrapper')
      break
    case 'cordova':
      platform = require('./cordova')
      break
  }
} else {
  platform = require('./mock')
}

module.exports = platform
