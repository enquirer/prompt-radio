'use strict';

var util = require('util');
var Checkbox = require('enquirer-prompt-checkbox');

/**
 * Radio prompt
 */

function Radio(/*question, answers, rl*/) {
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
  if (num <= this.choices.realLength) {
    this.pointer = num - 1;
    this.question.choices.toggleChoices(this.pointer);
  }
  this.render();
};

/**
 * When user presses the `space` bar
 */

Radio.prototype.onSpaceKey = function() {
  this.spaceKeyPressed = true;
  this.question.toggleChoices(this.pointer);
  this.render();
};

/**
 * Set the default value to use
 */

Radio.prototype.setDefault = function() {
  if (this.question.hasDefault) {
    var idx = this.question.choices.getIndex(this.question.default);
    this.question.toggleChoices(idx);
  }
};

/**
 * Module exports
 */

module.exports = Radio;
