import * as phina from 'phina.js';

/**
 * @class Logger
 * @param {Number} maxLogs 最大ログ格納数
 */
// export var Logger = phina.createClass({
export var Logger = phina.define('phina.util.Logger', {
  superClass: phina.util.EventDispatcher,

  init: function (maxLogs) {
    this.superInit();
    this._logs = []; // any[]
    this._maxLength = maxLogs || 16;
    this._cachedLogString = "";
  },

  push: function () {
    this._cachedLogString = "";
    Array.prototype.slice.call(arguments).forEach(function(log) {
      this._logs.push(log);
      if (this._maxLength < this._logs.length) this._logs.shift();
      this.flare('logged', log);
    }.bind(this));
  },

  clear: function () {
    this._cachedLogString = "";
    this._logs.length = 0;
    this.flare('clear');
  },

  _accessor: {
    logString: {
      get: function () {
        if (this._cachedLogString !== "") return this._cachedLogString;

        var str = "";
        this._logs.forEach(function (item) {
          str += JSON.stringify(item).replace(/"|{|}/g, '') + '\n';
        });
        this._cachedLogString = str;

        return str;
      },
    }
  },

});
