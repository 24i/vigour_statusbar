'use strict'

module.exports = function (inject, type) {
  var sb, bridge
  var manual = !inject

  it('require status-bar', function () {
    sb = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      sb = new sb.Constructor(inject)
    })
  }

  if (type.label === 'bridge') {
    bridge = window.vigour.native.bridge
  }

  it('should set properties on init', function (done) {
    sb.val = true
    sb.ready.is(true, function () {
      expect(sb.display.val).to.not.be.false
      expect(sb.background.color.val).to.not.be.false
      expect(sb.background.opacity.val).to.not.be.false
      expect(sb.text.color.val).to.not.be.false
      expect(sb.text.opacity.val).to.not.be.false
      done()
    })
  })

  it('should be able to change just color for background', (done) => {
    sb.background.color.on('data', (data) => {
      expect(sb.background.color.val).to.equal('FF0000')
      if (!manual) {
        done()
      }
    })

    sb.background.color.val = 'FF0000'

    if (manual) {
      alert('check if the color of status bar changed')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to change just the opacity for background', (done) => {
    sb.background.opacity.on('data', (data) => {
      expect(sb.background.opacity.val).to.equal(0.9)
      if (!manual) {
        done()
      }
    })
    sb.background.opacity.val = 0.9

    if (manual) {
      alert('check if the opacity of status bar changed')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to change just the color for text', (done) => {
    sb.text.color.on('data', (data) => {
      expect(sb.text.color.val).to.equal('00ff00')
      if (!manual) {
        done()
      }
    })
    sb.text.color.val = '00ff00'

    if (manual) {
      alert('check if the color of text changed')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to change just the opacity for text', (done) => {
    sb.text.opacity.on('data', (data) => {
      expect(sb.text.opacity.val).to.equal(0.9)
      if (!manual) {
        done()
      }
    })
    sb.text.opacity.val = 0.9

    if (manual) {
      alert('check if the opacity of text changed')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to hide the status bar', function (done) {
    sb.display.on('data', () => {
      expect(sb.display.val).to.equal('hidden')
      if (!manual) done()
    })
    sb.display.val = 'hidden'
    if (manual) {
      alert('check if the status bar is now hidden')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to put the status bar in overlay', function (done) {
    sb.display.on('data', () => {
      expect(sb.display.val).to.equal('hidden')
      if (!manual) done()
    })
    sb.display.val = 'overlay'
    if (manual) {
      alert('check if the status bar is now overlay')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to put the status bar on top', function (done) {
    sb.display.on('data', () => {
      expect(sb.display.val).to.equal('top')
      if (!manual) done()
    })
    sb.display.val = 'top'
    if (manual) {
      alert('check if the status bar is now on top')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })
}
