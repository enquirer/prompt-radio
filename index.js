'use strict';

var util = require('util');
var debug = require('debug')('prompt-radio');
var Checkbox = require('prompt-checkbox');

/**
 * Radio prompt
 */

function Radio(/*question, answers, rl*/) {
  debug('initializing from <%s>', __filename);
  Checkbox.apply(this, arguments);
}

/**
 * Inherit Checkbox prompt
 */

Checkbox.extend(Radio);

/**
 * When user presses a number key
 */

Radio.prototype.onNumberKey = function(str, key, state) {
  var num = Number(key.value);
  if (num <= this.choices.length) {
    this.position = num - 1;
    this.choices.toggle(this.position, true);
  }
  this.render();
};

/**
 * When user presses the `space` bar
 */

Radio.prototype.onSpaceKey = function() {
  this.spaceKeyPressed = true;
  this.choices.toggle(this.position, true);
  this.render();
};

/**
 * Get selected choice
 */

Radio.prototype.getAnswer = function() {
  return this.choices.checked[0];
};

/**
 * Set the default value to use
 */

Radio.prototype.setDefault = function() {
  if (this.question.hasDefault) {
    this.choices.toggle(this.question.default, true);
  }
};

/**
 * Module exports
 */

module.exports = Radio;
