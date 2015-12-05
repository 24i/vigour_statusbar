[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://badge.fury.io/js/vigour-status-bar.svg)](https://badge.fury.io/js/vigour-status-bar)
[![Build Status](https://travis-ci.org/vigour-io/status-bar.svg?branch=develop)](https://travis-ci.org/vigour-io/status-bar)

# Status bar
Enable status bar customizations

## Install
Add `"status-bar": "git+ssh://git@github.com:vigour-io/status-bar.git#master"` to the dependencies in your app's pakage.json, then run `npm update vigour-status-bar`
Coming soon: `npm i vigour-status-bar`

## Updates via upstream remote
- `git remote add skeleton git@github.com:vigour-io/plugin.git`
- `git pull skeleton develop`

## Usage
The plugin will be used to modify status bar properties.

```js
// plugin on init will expect to receive back the current status bar configuration
// passed as an object, eg: {network: 'wifi', model: 'iPhone 6s'}
var sb = require('vigour-status-bar')

// setting status bar display
sb.display.val 'top' // or hidden || overlay

// setting status bar background properties
sb.backgorund.color.val = '333'
sb.backgorund.opacity.val = 0.5

// setting status bar text properties
sb.backgorund.color.val = 'ccc'
sb.backgorund.opacity.val = 1
```

See for more use cases [tests](test)
