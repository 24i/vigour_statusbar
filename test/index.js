#!/usr/bin/env node
var nativeTests = require('vigour-native/test')
  , mocha = require('vigour-dev-tools').mocha
  , describe = mocha.describe
  , it = mocha.it
  , expect = mocha.expect
  , statusBar = require('../')

describe( 'statusBar', function () {
  it( "get('visibility') produces one of 'hidden', 'overlay' or 'top'", function (done) {
    statusBar.get('visibility', function (err, visibility) {
      expect(~visibilities.indexOf(visibility)).to.be.true
      done(err)
    })
  })

  it("hide", function (done) {
    statusBar.hide(function (err) {
      expect(err).to.be.null
      statusBar.get('visibility', function (err, visibility) {
        visibility.should.be.equal.to('hidden')
        done()
      })
    })
  })

  it("show", function (done) {
    statusBar.show(function (err) {
      expect(err).to.be.null
      statusBar.get('visibility', function (err, visibility) {
        visibility.should.be.equal.to('overlay')
        done()
      })
    })
  })

  it("Setting everything", function (done) {
    statusBar.set({
      bg: "#123456"
      , color: "#abcdef"
      , opacity: "0.5"
      , visibility: "top"
    }, function (err) {
      expect(err).to.be.null
      statusBar.get(function (err, data) {
        expect(err).to.be.null
        data.bg.should.be.equal("#123456")
        data.color.should.be.equal("#abcdef")
        data.opacity.should.be.equal("0.5")
        data.visibility.should.be.equal("top")
        done(err)
      })
    })
  })

  it("Setting while hiding", function (done) {
    statusBar.set({
      bg: "#098765"
      , color: "#123456"
      , opacity: "0.5"
      , visibility: "hidden"
    }, function (err) {
      expect(err).to.be.null
      statusBar.get(function (err, state) {
        expect(err).to.be.null
        data.bg.should.be.equal("#098765")
        data.color.should.be.equal("#123456")
        data.opacity.should.be.equal("0.5")
        data.visibility.should.be.equal("hidden")
        done(err)
      })
    })
  })
})
