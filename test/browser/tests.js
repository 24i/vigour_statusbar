'use strict'
module.exports = function (inject) {
  var sb
  var COLOR = '444'
  var OPACITY = 0.9

  it('require plugin', function () {
    sb = require('../../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      sb = new sb.Constructor(inject)
    })
  }

  // init
  it('should set properties on init', (done) => {
    sb.val = true
    sb.ready.is(true, () => {
      expect(sb.display.val).to.equal('top')
      expect(sb.background.color.val).to.equal('333')
      expect(sb.background.opacity.val).to.equal(0.5)
      expect(sb.text.color.val).to.equal('333')
      expect(sb.text.opacity.val).to.equal(0.5)
      done()
    })
  })

  // background
  it('should be able to change just color for background', (done) => {
    sb.background.color.on('value', (data) => {
      expect(sb.background.color.val).to.equal(COLOR)
      done()
    })
    sb.background.color.val = COLOR
  })

  it('should be able to change just opacity for background', (done) => {
    sb.background.opacity.on('value', (data) => {
      expect(sb.background.opacity.val).to.equal(OPACITY)
      done()
    })
    sb.background.opacity.val = OPACITY
  })

  // text
  it('should be able to change just color for text', (done) => {
    sb.text.color.on('value', (data) => {
      expect(sb.text.color.val).to.equal(COLOR)
      done()
    })
    sb.text.color.val = COLOR
  })

  it('should be able to change just opacity for text', (done) => {
    sb.text.opacity.on('value', (data) => {
      expect(sb.text.opacity.val).to.equal(OPACITY)
      done()
    })
    sb.text.opacity.val = OPACITY
  })
}
