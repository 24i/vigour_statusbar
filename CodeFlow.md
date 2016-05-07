# vigour-statusbar code flow

The statusbar module follows the general code flow of all vigour cross-platform plugins.

# JavaScript

## Project
Module user, front end dev in need of native statusbar control will go:
```JavaScript
var statusbar = require('vigour-statusbar')
statusbar.display.val = false // to hide statusbar
```

## vigour-statusbar
Internally, the statusbar module presents a single API, then handles input from the user based on the platform it's running on.
```JavaScript
var statusbar = {
  platform: require('platform'),
  display: {
    on: {
      data () {
        /* on change: */
        if (this.val) {
          /* statusbar.display.val = true */
          this.parent.platform.emit('display', true)
        } else {
          /* statusbar.display.val = false */
          this.parent.platform.emit('display', false)
        }
      }
    }
  }
}
```

### Platform specifics
Depending on the platform the app code is running on, events emitted through input in the shared API is handled differently.

#### Cordova
In case of a Cordova built app, we will use `window.StatusBar`.
```JavaScript
var platform = {
  on: {
    display (val) {
      if (val) {
        window.StatusBar.show()
      } else {
        window.StatusBar.hide()
      }
    }
  }
}
```
#### Wrapper
In case of a vigour-wrapper built app, we will use the `vigour-wrapper-bridge` module.
```JavaScript
var bridge = require('vigour-wrapper-bridge')
var platform = {
  on: {
    display (val) {
      bridge.send('statusbar', {display: val})
    }
  }
}
```
#### Browser
In case of Statusbar, there is no implementation for the browser, but e.g. Facebook would use the web SDK.

#### Mock
Our moduels can also run bare JavaScript environments like Node.js to run tests. For this case, we might implement some activity on interaction with the API to facilitate testing.
