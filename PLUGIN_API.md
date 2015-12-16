## iOS Behaviors
Since is iOS not all the behaviour are working, the plugin will execute statusbar changes in the followinf way:

* it will ignore color changes for both background and text
* it will set statusbar trnasparent or not transparent based on background opacity
* it will set statusbar as hidden for display value `hidden` and not hidden for other values

### Plugin API
**Emits**
`init`, on init the plugin expects the statusbar configuration ad JSON data, eg: `{ display: 'top', background: {color: '333', opacity: 0.2}, text: {color: '444', opacity: 0.5}}`
`display`, sent the display property for the statusbar in the form of string with value `hidden` or `top` or `overlay`
`background`, for changing statusbar background properties, data passed as JSON eg: `{ color: 'HEX COLOR' }` or `{ opacity: FLOAT }` or both `{ color: 'HEX COLOR', opacity: FLOAT }`
