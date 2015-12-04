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

  it('should set properties on init', function () {
    sb.val = true
    sb.ready.is(true, function () {
      console.log('ready')
      expect(sb.display.val).to.not.be.false
      expect(sb.background.color.val).to.not.be.false
      expect(sb.background.opacity.val).to.not.be.false
      expect(sb.text.color.val).to.not.be.false
      expect(sb.text.opacity.val).to.not.be.false
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

   // display
  // it('should be able to hide the status bar', function (done) {
  //   this.timeout(25000)
  //   sb.display.val = 'hidden'
  //   setTimeout(() => {
  //     expect(sb.display.val).to.equal('hidden')
  //     done()
  //   }, 1000)
  //   alert('status bar should be hidden')
  // })

  // it('should be able to put the status bar in overlay', function (done) {
  //   this.timeout(25000)
  //   sb.display.val = 'overlay'
  //   setTimeout(() => {
  //     expect(sb.display.val).to.equal('overlay')
  //     done()
  //   }, 1000)
  //   alert('status bar should be in overlay')
  // })

  // it('should be able to put the status bar on top', function (done) {
  //   this.timeout(25000)
  //   sb.display.val = 'top'
  //   setTimeout(() => {
  //     expect(sb.display.val).to.equal('top')
  //     done()
  //   }, 1000)
  //   alert('status bar should be on top')
  // })
}
