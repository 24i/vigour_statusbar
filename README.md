# vigour-native-statusBar

Allows one to control the native status bar from a web app

##Install
`npm i vigour-native-statusBar`

##Usage
```
var statusBar = require('statusBar')
statusBar.hide(function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log("Success")
    }
})
statusBar.show(function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log("Success")
    }
})
statusBar.isVisible(function (err, visible) {
    if (err) {
        console.error(err)
    } else {
        console.log(visible)
    }
})
```

##Building a set of native apps from your codebase
Use [`vigour-native`](https://github.com/vigour-io/vigour-native) or the complete [`vigour-dev-tools`](https://github.com/vigour-io/vigour-native)
