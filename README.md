[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://badge.fury.io/js/vigour-statusbar.svg)](https://badge.fury.io/js/vigour-statusbar)
[![Build Status](https://travis-ci.org/vigour-io/statusbar.svg?branch=develop)](https://travis-ci.org/vigour-io/statusbar)

# Status bar
Enables dynamic status bar customization.

## Install
`npm i vigour-statusbar --save `

## Usage, JavaScript API
The plugin will be used to modify status bar properties.

```js
// plugin on init will expect to receive back the current status bar configuration
// passed as an object, eg: {network: 'wifi', model: 'iPhone 6s'}
var sb = require('vigour-statusbar')

// setting status bar display
sb.display.val = 'top' // or hidden || overlay

// setting status bar background properties
sb.backgorund.color.val = '333'
sb.backgorund.opacity.val = 0.5

// setting status bar text properties
sb.text.color.val = 'ccc'
sb.text.opacity.val = 1

// all properties are obervables as always!
sb.text.color.on('data', () => {
  // text color is changed!
})
```

See for more use cases [tests](test)

## Native bridge API

### get(callBack)

Returns the current settings of the statusbar in [Statusbar properties](#properties) format.

### set(properties, callBack)

Applies the settings in `properties` in [Statusbar properties](#properties) format.

#### Statusbar properties<a name="properties"></a>

Communication about settings of the statusbar always take the following form (keys can be omitted in case of set)

```JavaScript
var properties = {
  display: 'top', // 'hidden', // 'overlay', //
  background: {
    color: 'ffffff', // six character colour code
    opacity: 0.3 // value between 0 and 1
  },
  text: {
    color: 'ffffff', // six character colour code
    opacity: 0.3 // value between 0 and 1
  }
}
```
