'use strict'
var env = require('vigour-env')

if (env.isNative.val) {
  module.exports = require('./native')
} else {
  module.exports = require('./mock')
}
