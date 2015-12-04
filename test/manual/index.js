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
})
