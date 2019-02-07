import * as phina from 'phina.js';
import { Logger } from './logger.js';

var DEFAULT_SCROLL_SENSIBILITY = 2;

/**
 * @class LogLabelArea
 * @param params[] todo
 */
export var LogLabelArea = phina.define('phina.display.LogLabelArea', {
  superClass: phina.ui.LabelArea,

  init: function (params) {
    params = ({}).$safe(params, LogLabelArea.defaults);
    this.superInit(params);
    this._logger = Logger(params.maxLog);
    if (params.dragScroll) {
      this.setDragScroll(params.dragScroll);
    }
    this._removePrevScroll = null;
  },

  setDragScroll: function (sensibility) {
    if (this._removePrevScroll) this._removePrevScroll();

    var listener = function (e) {
      sensibility = (!Number.isNaN(sensibility)) ? sensibility : DEFAULT_SCROLL_SENSIBILITY;
      var delta = e.pointer.dy * sensibility;
      this.scrollY = Math.max(this.scrollY + delta, 0);
    };
    this.setInteractive(true)
      .on('pointmove', listener);
    this._removePrevScroll = function () {
      this.off('pointmove', listener);
    }.bind(this);

    return this;
  },

  /**
   * @param ... any
   */
  add: function () {
    /* 一度に追加されたら文字列で一つにまとめる？ */
    // var args = Array.prototype.slice.call(arguments);
    // var str = "";
    // args.forEach(function(item) {
    //   str += JSON.stringify(item).replace(/"|{|}/g, '') + ', ';
    // }.bind(this));
    // this._logger.push(str);
    // this.text = this._logger.logString; // update text

    this._logger.push.apply(this._logger, arguments);
    this.text = this._logger.logString; // update text
    return this;
  },

  clear: function () {
    this._logger.clear();
    this.text = "";
    return this;
  },

  _accessor: {
    logs: {
      get: function () { return this._logger._logs; }
    },
  },

  _static: {
    defaults: {
      text: "Logs will be shown here!",
      fontSize: 14,
      fill: "limegreen",
      backgroundColor: "black",
      maxLog: 16,
      dragScroll: false,
    },
  },

});