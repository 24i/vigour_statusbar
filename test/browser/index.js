'use strict'

var tests = require('../tests')

describe('Status Bar', function () {
  describe('Mock Platform Tests', function () {
    tests(require('../../lib/platform/mock'), 'platform')
  })

  describe('Mock Native Tests', function () {
    var mockBridge = require('./mockBridge')
    var nativePlatform = require('../../lib/platform/native')
    tests(nativePlatform, mockBridge)
  })
})
