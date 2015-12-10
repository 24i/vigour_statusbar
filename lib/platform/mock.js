'use strict'
exports._platform = {
  on: {
    init: {
      statusbar () {
        this.parent.ready.val = true
      }

    },
    change: {
      statusbar (data) {
        data.done(null)
      }
    },
    display: {
      statusbar (data) {
        data.done(null)
      }
    }
  }
}
