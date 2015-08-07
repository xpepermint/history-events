# [history](https://developer.mozilla.org/en-US/docs/Web/API/Window/history)-events

> Adds missing window.history events onpushstate, onreplacestate and onchangestate.

This module patches browser's `window.history` object and adds support for additional history events. You can use this module in a `polymorphic` applications (it only loads if inside a browser and does not raise an error on server side).

## Setup

```html
<script src="dist/history-events.min.js" type="text/javascript"></script>
```

If you are compiling assets using a bundler (e.g. [webpack](http://webpack.github.io/)) then you just do the `import` inside your main file.

```js
// es5
var history = require('history-events');
// es6
import history from 'history-events';
```

## Usage

```js
var history = require('history-events');

if (history.isHistorySupported()) {
  window.addEventListener('changestate', function(e) {
    console.log('URL changed');
  });

  window.history.pushState(null, null, '/login'); // `changestate` will be triggered
}
```

## API

### Window Events

* **onpopstate** is triggered when browser's back/forward button is pressed.
* **onpushstate** is triggered on `window.history.pushState` method call.
* **onreplacestate** is triggered on `window.history.replaceState` method call.
* **onchangestate** is triggered on `window.history.pushState` or `window.history.replaceState` method call or when browser's back/forward button is pressed.

### Module Methods

* **history.isHistorySupported()** returns true when `window.history` feature is supported by the environment.
* **addEventListener** registes a new event.
* **removeEventListener** unregistes a new event.
* **triggerEvent** triggers an event.
