'use strict'
var agent = require('vigour-ua')(navigator.userAgent)
var env = global.env
var target = env && env.target

if (target === 'android' || target === 'ios') {
  module.exports = require('./native')
// temp until env works!
} else if (agent.platform === 'ios' || agent.platform === 'android') {
  module.exports = require('./native')
} else {
  module.exports = require('./mock')
}
