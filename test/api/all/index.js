#!/usr/bin/env node
// var nativeTests = require('vigour-native/test')
var mocha = require('vigour-dev-tools').mocha
var describe = mocha.describe
var it = mocha.it
var expect = mocha.expect
var statusBar = require('../../../')
var visibilities = ['hidden', 'overlay', 'top']

describe('statusBar', function () {
  it("get() produces a visibility: one of 'hidden', 'overlay' or 'top'", function (done) {
    statusBar.get(function (err, data) {
      expect(~visibilities.indexOf(data.visibility)).to.be.true
      done(err)
    })
  })

  it("set({visibility:'hidden'}) should hide the status bar", function (done) {
    statusBar.set({visibility: 'hidden'}, function (err) {
      expect(err).to.be.null
      statusBar.get(function (err, data) {
        expect(err).to.be.null
        data.visibility.should.be.equal.to('hidden')
        done()
      })
    })
  })

  it("set({visibility:'overlay'})", function (done) {
    statusBar.set({visibility: 'overlay'}, function (err) {
      expect(err).to.be.null
      statusBar.get(function (err, data) {
        expect(err).to.be.null
        data.visibility.should.be.equal.to('overlay')
        done()
      })
    })
  })

  it('Setting everything', function (done) {
    statusBar.set({
      bg: '#123456',
      color: '#abcdef',
      opacity: '0.5',
      visibility: 'top'
    }, function (err) {
      expect(err).to.be.null
      statusBar.get(function (err, data) {
        expect(err).to.be.null
        data.bg.should.be.equal('#123456')
        data.color.should.be.equal('#abcdef')
        data.opacity.should.be.equal('0.5')
        data.visibility.should.be.equal('top')
        done(err)
      })
    })
  })

  it('Setting while hiding', function (done) {
    statusBar.set({
      bg: '#098765',
      color: '#123456',
      opacity: '0.5',
      visibility: 'hidden'
    }, function (err) {
      expect(err).to.be.null
      statusBar.get(function (err, data) {
        expect(err).to.be.null
        data.bg.should.be.equal('#098765')
        data.color.should.be.equal('#123456')
        data.opacity.should.be.equal('0.5')
        data.visibility.should.be.equal('hidden')
        done(err)
      })
    })
  })
})
