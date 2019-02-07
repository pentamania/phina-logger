phina-logger
===

ログを簡単に描画するためのphina.jsプラグイン

# Install

```npm i pentamania/phina-logger```

```js
import {LogLabelArea} from 'phina-logger.js';
```

or

```html
<script src="path/to/phina.js"></script>
<script src="path/to/phina-logger.js"></script>
```

# Example

```js
phina.main(function () {
  var app = phina.game.GameApp({
    startLabel: 'main',
    backgroundColor: "skyblue",
  });

  app.run();
});

phina.define('MainScene', {
  superClass: phina.display.DisplayScene,

  init: function (options) {
    this.superInit(options);

    this.logLabelArea = phina.display.LogLabelArea({
      maxLog: 18,
      height: this.height * 0.8
    })
      .setPosition(20, 20)
      .addChildTo(this)
      ;
  },

  update: function (app) {
    var p = app.pointer;
    if (p.getPointing()) {
      this.logLabelArea.add(
        {px: p.x.toFixed(2), py: p.y.toFixed(2)}
      );
    }
  },

});
```


