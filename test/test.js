#!/usr/bin/env node
var tools = require('vigour-dev-tools')

tools.test.run({
  all:
  { html:'test/test.html'
  , dir:'test/api'
  , type:'browser'
  }
})