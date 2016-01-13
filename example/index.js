'use strict'
var sb = require('../lib')
var Observable = require('vigour-js/lib/observable')
var app = window.app = require('vigour-element/lib/app')

require('./index.less')

var backgroundColor = new Observable(sb.background.color.val)
var textColor = new Observable(sb.text.color.val)

backgroundColor.on('data', function () {
  sb.background.color.val = this.val
})
textColor.on('data', function () {
  sb.text.color.val = this.val
})

app.set({
  node: document.body,
  style: {
    backgroundColor: 'black',
    color: 'white'
  },
  title: {
    node: 'h1',
    text: 'Statusbar testing !!'
  },
  showPanel: {
    hideStatusbar: {
      node: 'button',
      text: 'Hide',
      on: {
        click () {
          sb.display.val = 'hidden'
        }
      }
    },
    overlayStatusbar: {
      node: 'button',
      text: 'Overlay',
      on: {
        click () {
          sb.display.val = 'overlay'
        }
      }
    },
    topStatusbar: {
      node: 'button',
      text: 'Top',
      on: {
        click () {
          sb.display.val = 'top'
        }
      }
    }
  },
  backgroundColorPanel: {
    label: {
      node: 'label',
      text: 'Background Color:'
    },
    theColor: {
      node: 'input',
      on: {
        click () {
          this.node.focus()
          this.node.value = this.node.value
        },
        change () {
          backgroundColor.val = this.node.value
        }
      },
      value: backgroundColor,
      attributes: {
        type: 'text'
      }
    }
  },
  textColorPanel: {
    label: {
      node: 'label',
      text: 'Text Color:'
    },
    theColor: {
      node: 'input',
      on: {
        click () {
          this.node.focus()
          this.node.value = this.node.value
        },
        change () {
          textColor.val = this.node.value
        }
      },
      value: textColor,
      attributes: {
        type: 'text'
      }
    }
  }
})
