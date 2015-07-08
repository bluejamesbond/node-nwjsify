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

#Important
- Remember to set the `node-remote` property for nwjs `package.json` (refer to [nwjs security](https://github.com/nwjs/nw.js/wiki/Security) for more information). Additionally, refer to the sample nwjs compatible [`package.json`](https://github.com/nwjs/nw.js/blob/2673b0b23ee9cf003a41248e67b23563c593c096/tests/automatic_tests/remote-img/imgnotshown/package.json).