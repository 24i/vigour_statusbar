'use strict'
exports._platform = {
  on: {
    init: {
      statusbar () {
        setTimeout(() => {
          this.parent.ready.val = true
        })
      }

    },
    change: {
      statusbar (data) {
        setTimeout(() => {
          data.done(null)
          return
        })
      }
    }
  }
}
