'use strict'
var env = require('vigour-env')

if (env.isNative.val) {
  module.exports = require('./mock') // TODO change when native platform is ready
} else {
  module.exports = require('./mock')
}
