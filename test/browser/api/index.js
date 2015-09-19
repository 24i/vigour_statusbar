/* global describe, it, expect */
console.clear()

var Observable = require('vjs/lib/observable')

describe('statusBar', function () {
  var statusBar
  it('should be requireable', function () {
    statusBar = require('../../../')
    expect(statusBar).instanceof(Observable)
  })

  it('should fire change listener', function () {
    statusBar
      .on('change', function () {
        console.error('blurf blurf')
      })
      .on('error', function (event, err) {
        console.error('gotz error', err)
      })

    statusBar.background.color.val = '#fffff'
  })
})
