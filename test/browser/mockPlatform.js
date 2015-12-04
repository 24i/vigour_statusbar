'use strict'
exports.platform = {
  on: {
    init: {
      statusbar () {
        this.parent.set({
          display: 'top',
          background: {
            color: '333',
            opacity: 0.5
          },
          text: {
            color: '333',
            opacity: 0.5
          }
        })
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
