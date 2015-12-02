exports.properties = {
  color: {
    val: false,
    on: {
      value: {
        condition (data, done, event) {
          handleColorChange('color', data, done)
        }
      }
    }
  },
  opacity: {
    val: false,
    on: {
      value: {
        condition (data, done, event) {
          handleColorChange('opacity', data, done)
        }
      }
    }
  }
}

var handleColorChange = (type, data, done) => {
  var property = this.parent.val
  var conf
  if (type === 'color') {
    conf = {
      color: data,
      opacity: this.parent.opacity.val
    }
  } else {
    conf = {
      color: this.parent.color.val,
      opacity: data
    }
  }
  this.platform.emit('change', {property: property, conf: conf, done: done})
}
