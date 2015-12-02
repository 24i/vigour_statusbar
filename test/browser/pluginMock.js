'use strict'
exports.platform = {
  on: {
    init: {
      statusbar () {
        setTimeout(() => {
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
        })
      }
    }
  }
}
