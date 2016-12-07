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

util.inherits(Radio, Checkbox);

/**
 * When user presses a number key
 */

Radio.prototype.onNumberKey = function(event) {
  var num = Number(event.value);
  if (num <= this.choices.length) {
    this.position = num - 1;
    this.question.toggle(this.position, true);
  }
  this.render();
};

/**
 * When user presses the `space` bar
 */

Radio.prototype.onSpaceKey = function() {
  this.spaceKeyPressed = true;
  this.question.toggle(this.position, true);
  this.render();
};

/**
 * Get selected choice
 */

Radio.prototype.getSelected = function() {
  return this.choices.checked[0];
};

/**
 * Set the default value to use
 */

Radio.prototype.setDefault = function() {
  if (this.question.hasDefault) {
    this.question.toggle(this.choices.getIndex(this.question.default), true);
  }
};

/**
 * Hide/show cursor
 */

function show() {
  process.stdout.write('\u001b[?25h');
}

function hide() {
  process.stdout.write('\u001b[?25l');
}

/**
 * Module exports
 */

module.exports = Radio;
