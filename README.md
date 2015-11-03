# vigour-status-bar
Allows one to control the native status bar from a web app

## Install
- Add `"plugin": "git+ssh://git@github.com:vigour-io/plugin.git#master"` to the dependencies in [pakage.json](pakage.json)
- Run `npm update plugin`
- *Coming soon*: `npm i vigour-plugin`

## Updates via upstream remote
- `git remote add skeleton git@github.com:vigour-io/plugin.git`
- `git pull skeleton develop`

## Usage
See [tests](test)

## Building native apps
See [wrapper](http://github.com/vigour-io/vigour-native)

## API

```
{
  display: "top" | "hidden" | "overlay",
  background: {
    color: <hex code>
    opacity: [0..1]
  },
  text: {
    color: <hex code>
    opacity: [0..1]
  },
}
```
