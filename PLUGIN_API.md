### Plugin API

**Emits**

* `init`, on init the plugin expects the statusbar configuration ad JSON data, eg: `{ display: 'top', background: {color: '333', opacity: 0.2}, text: {color: '444', opacity: 0.5}}`
* `display`, sent the display property for the statusbar in the form of string with value `hidden` or `top` or `overlay`
* `background`, for changing statusbar background properties, data passed as JSON eg: `{ color: 'HEX COLOR' }` or `{ opacity: FLOAT }` or both `{ color: 'HEX COLOR', opacity: FLOAT }`
