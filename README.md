# vigour-native-statusBar
Allows one to control the native status bar from a web app

##Install
`npm i vigour-native-statusBar`

##Usage
See [the tests](test/api/all/index.js)

NOTE tests are out of date the api is now get/set of a object with this structure:
```
{
  display: "top" | "hidden" | "overlay",
  background: {
    color: <hex code>
    transparency: [0..1]
  },
  foreground: {
    color: <hex code>
    transparency: [0..1]
  },
}
```
