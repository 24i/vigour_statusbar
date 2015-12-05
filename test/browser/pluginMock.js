'use strict'
exports.platform = {
  on: {
    init: {
      statusbar () {
        setTimeout(() => {
          this.parent.set({
            ready: true,
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
        })
      }
    },
    change: {
      statusbar () {
        setTimeout(() => {
          return
        })
      }
    }
  }
}
