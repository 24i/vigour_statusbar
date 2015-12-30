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
    sb.background.color.on('data', (data) => {
      expect(sb.background.color.val).to.equal('000000')
      if (!manual) {
        done()
      }
    })

    sb.background.color.val = '000000'

    if (manual) {
      alert('check if the color of status bar changed')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to set color for background to ffffff', function (done) {
    this.timeout(5000)
    sb.background.color.on('data', (data) => {
      expect(sb.background.color.val).to.equal('ffffff')
      if (!manual) {
        done()
      }
    })

    sb.background.color.val = 'ffffff'

    if (manual) {
      alert('check if the color of status bar changed')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to set the opacity for background to 0', function (done) {
    this.timeout(5000)
    sb.background.opacity.on('data', (data) => {
      expect(sb.background.opacity.val).to.equal(0)
      if (!manual) {
        done()
      }
    })
    sb.background.opacity.val = 0

    if (manual) {
      alert('check if the opacity of status bar changed')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to set the opacity for background to 1', function (done) {
    this.timeout(5000)
    sb.background.opacity.on('data', (data) => {
      expect(sb.background.opacity.val).to.equal(1)
      if (!manual) {
        done()
      }
    })
    sb.background.opacity.val = 1

    if (manual) {
      alert('check if the opacity of status bar changed')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to set the color for text to 000000', function (done) {
    this.timeout(5000)
    sb.text.color.on('data', (data) => {
      expect(sb.text.color.val).to.equal('000000')
      if (!manual) {
        done()
      }
    })
    sb.text.color.val = '000000'

    if (manual) {
      alert('check if the color of text changed')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to set the color for text to ffffff', function (done) {
    this.timeout(5000)
    sb.text.color.on('data', (data) => {
      expect(sb.text.color.val).to.equal('ffffff')
      if (!manual) {
        done()
      }
    })
    sb.text.color.val = 'ffffff'

    if (manual) {
      alert('check if the color of text changed')
      setTimeout(function () {
        done()
      }, 1000)
    }
  })

  it('should be able to set the opacity for text to 1', function (done) {
    this.timeout(5000)
    sb.text.opacity.on('data', (data) => {
      expect(sb.text.opacity.val).to.equal(1)
      if (!manual) {
        done()
      }
    })
    sb.text.opacity.val = 1

    if (manual) {
      alert('check if the opacity of text changed')
      setTimeout(function () {
        done()
      }, 2000)
    }
  })

  it('should be able to set the opacity for text to 0', function (done) {
    this.timeout(5000)
    sb.text.opacity.on('data', (data) => {
      expect(sb.text.opacity.val).to.equal(0)
      if (!manual) {
        done()
      }
    })
    sb.text.opacity.val = 0

    if (manual) {
      alert('check if the opacity of text changed')
      setTimeout(function () {
        done()
      }, 2000)
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
