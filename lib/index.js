'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')

module.exports = new Plugin({
  inject: require('./platform'),
  display: {
    val: false,
    on: {
      value: {
        condition (data, done, event) {
          var val = this.val
          if (val.match(/^(top|hidden|overlay)$/)) {
            this.platform.emit('display', {display: val, done: done})
          }
        }
      }
    }
  },
  background: {
    color: {
      val: false,
      on: {
        data: {
          condition (data, done, event) {
            this.platform.emit('change', {
              property: {
                name: 'background',
                value: {
                  color: data
                }
              },
              done: done
            })
          }
        }
      }
    },
    opacity: {
      val: false,
      on: {
        data: {
          condition (data, done, event) {
            this.platform.emit('change', {
              property: {
                type: 'background',
                value: {
                  opacity: data
                }
              },
              done: done
            })
          }
        }
      }
    }
  },
  text: {
    color: {
      val: false,
      on: {
        data: {
          condition (data, done, event) {
            this.platform.emit('change', {
              property: {
                name: 'text',
                value: {
                  color: data
                }
              },
              done: done
            })
          }
        }
      }
    },
    opacity: {
      val: false,
      on: {
        data: {
          condition (data, done, event) {
            this.platform.emit('change', {
              property: {
                name: 'text',
                value: {
                  opacity: data
                }
              },
              done: done
            })
          }
        }
      }
    }
  },
  on: {
    data: {
      statusbar () {
        this.platform.emit('init')
      }
    }
  }
})
