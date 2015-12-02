'use strict'
require('gaston-tester')

describe('Status Bar plugin manual tests', function () {
  var sb = require('../../lib')

  // after the init we receive back all the properties expected
  it('should receive back all the properties after the init', function (done) {
    sb.ready.is(true, () => {
      expect(sb.display.val).to.not.be.false
      expect(sb.background.color.val).to.not.be.false
      expect(sb.background.opacity.val).to.not.be.false
      expect(sb.text.color.val).to.not.be.false
      expect(sb.text.opacity.val).to.not.be.false
      done()
    })
  })

  // display
  it('should be able to hide the status bar', function (done) {
    this.timeout(25000)
    sb.display.val = 'hidden'
    setTimeout(() => {
      expect(sb.display.val).to.equal('hidden')
      done()
    }, 1000)
    alert('status bar should be hidden')
  })

  it('should be able to put the status bar in overlay', function (done) {
    this.timeout(25000)
    sb.display.val = 'overlay'
    setTimeout(() => {
      expect(sb.display.val).to.equal('overlay')
      done()
    }, 1000)
    alert('status bar should be in overlay')
  })

  it('should be able to put the status bar on top', function (done) {
    this.timeout(25000)
    sb.display.val = 'top'
    setTimeout(() => {
      expect(sb.display.val).to.equal('top')
      done()
    }, 1000)
    alert('status bar should be on top')
  })

  // background
  it('should be able to change background color', function (done) {
    this.timeout(25000)
    sb.background.color.val = 'FF0000'
    setTimeout(() => {
      expect(sb.background.color.val).to.equal('FF0000')
      done()
    }, 1000)
    alert('status bar background color will be red')
  })

  it('should be able to change background color', function (done) {
    this.timeout(25000)
    sb.background.ipacity.val = 1
    setTimeout(() => {
      expect(sb.background.opacity.val).to.equal(1)
      done()
    }, 1000)
    alert('status bar background opacity will be 1')
  })

  // text
  it('should be able to change text color', function (done) {
    this.timeout(25000)
    sb.text.color.val = '00FF00'
    setTimeout(() => {
      expect(sb.text.color.val).to.equal('00FF00')
      done()
    }, 1000)
    alert('status bar text color will be green')
  })

  it('should be able to change text color', function (done) {
    this.timeout(25000)
    sb.text.ipacity.val = 1
    setTimeout(() => {
      expect(sb.text.opacity.val).to.equal(1)
      done()
    }, 1000)
    alert('status bar text opacity will be 1')
  })
})
