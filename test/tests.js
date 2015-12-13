'use strict'

module.exports = function (inject, type) {
  var sb
  var manual = !inject

  it('require status-bar', function () {
    sb = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      sb = new sb.Constructor(inject)
    })
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
    this.timeout(5000)
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
    this.timeout(5000)
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
    this.timeout(5000)
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
    this.timeout(5000)
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
      }, 2000)
    }
  })

  it('should be able to control the display of status bar', function (done) {
    this.timeout(5000)
    var displayShould
    var times = 0
    sb.display.on('data', () => {
      expect(sb.display.val).to.equal(displayShould)
      if (!manual && times === 3) done()
      })
      setTimeout(() => {
        times++
        sb.display.val = displayShould = 'hidden'
        setTimeout(() => {
          times++
          sb.display.val = displayShould = 'overlay'
          setTimeout(() => {
            times++
            sb.display.val = displayShould = 'top'
          }, 1000)
        }, 1000)
      }, 1000)
      if (manual) {
        alert('did the statusbar changed 3 times (hidden, overlay, top)?')
        setTimeout(function () {
          done()
        }, 1000)
      }
    })
  }
