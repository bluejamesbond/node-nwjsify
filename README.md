# nw.js-ify
Browserify transform for [nw.js](https://github.com/nwjs/nw.js) native-app support

### Install
```
npm install nwjs-browserify
```

### Example
### Setup (via Grunt OR package.json)
**Gruntfile.js**
```js
var nwjsify = require('nwjs-browserify');
// ...
{
    // ...
	browserify: {
		options: {
			transform: [nwjsify /** or nwjsify.with('_require') **/]
		}
	}
	// ...
}
```
**package.json**
```js
{
  "name": "mymodule",
  "browserify": {
    "transform": "nwjs-browserify"
  }
}
```

### Usage
**ClientSide.js** (which will be bundled by browserify)
```js
var gui = _require('nw.gui');
global.window && gui.Window.get().minimize(); // minimizes the client's window
```

**app.js** (server)
```js
var nwjsify = require('nwjs-browserify');
nwjsify.attachShim();  // or specify with nwjsify.attachShim('_require'); 
```