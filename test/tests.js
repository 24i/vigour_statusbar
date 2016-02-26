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

  it('should be able to set color for background to 000000', function (done) {
    this.timeout(5000)
    sb.background.color.val = '000000'
    if (manual) {
      setTimeout(function () {
        done()
      }, 1000)
    } else {
      setTimeout(function () {
        done()
      })
    }
  })

  it('should be able to set color for background to ffffff', function (done) {
    this.timeout(5000)
    sb.background.color.val = 'ffffff'
    if (manual) {
      setTimeout(function () {
        done()
      }, 1000)
    } else {
      setTimeout(function () {
        done()
      })
    }
  })

  it('should be able to set the opacity for background to 0', function (done) {
    this.timeout(5000)
    sb.background.opacity.val = 0
    if (manual) {
      setTimeout(function () {
        done()
      }, 1000)
    } else {
      setTimeout(function () {
        done()
      })
    }
  })

  it('should be able to set the opacity for background to 1', function (done) {
    this.timeout(5000)
    sb.background.opacity.val = 1

    if (manual) {
      setTimeout(function () {
        done()
      }, 1000)
    } else {
      setTimeout(function () {
        done()
      })
    }
  })

  it('should be able to set the color for text to 000000', function (done) {
    this.timeout(5000)
    sb.text.color.val = '000000'

    if (manual) {
      setTimeout(function () {
        done()
      }, 1000)
    } else {
      setTimeout(function () {
        done()
      })
    }
  })

  it('should be able to set the color for text to ffffff', function (done) {
    this.timeout(5000)
    sb.text.color.val = 'ffffff'

    if (manual) {
      setTimeout(function () {
        done()
      }, 1000)
    } else {
      setTimeout(function () {
        done()
      })
    }
  })

  it('should be able to set the opacity for text to 1', function (done) {
    this.timeout(5000)
    sb.text.opacity.val = 1

    if (manual) {
      setTimeout(function () {
        done()
      }, 2000)
    } else {
      setTimeout(function () {
        done()
      })
    }
  })

  it('should be able to set the opacity for text to 0', function (done) {
    this.timeout(5000)
    sb.text.opacity.val = 0
    if (manual) {
      setTimeout(function () {
        done()
      }, 2000)
    } else {
      setTimeout(function () {
        done()
      })
    }
  })

  it('should set statusbar to hidden', function (done) {
    sb.display.val = 'hidden'
    setTimeout(function () {
      done()
    }, 1000)
  })

  it('should set statusbar to top', function (done) {
    sb.display.val = 'top'
    setTimeout(function () {
      done()
    }, 1000)
  })

  it('should set statusbar to overlay', function (done) {
    sb.display.val = 'overlay'
    setTimeout(function () {
      done()
    }, 1000)
  })
}
